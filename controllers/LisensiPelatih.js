import LisensiPelatih from "../models/LisensiPelatihModels.js";
import path from "path"
import Pelatih from "../models/Pelatihmodels.js";
import fs from "fs"
export const getLisensiPelatih = async (req, res) => {
    try {
        const response = await LisensiPelatih.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
    
}
export const getLisensiPelatihbyIDPelatih= async (req, res) => {
    try {
        const response = await LisensiPelatih.findAll({
            where: {
                id_pelatih: req.params.idPelatih
            },
            include : [{
              model : Pelatih
            }]


        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }  
}

export const createLisensiPelatih = async (req, res) => {
     if (!req.files || !req.files.file) {
       return res.status(400).json({ msg: "Tidak Ada File Dipilih" });
     }

     const file = req.files.file;
     const fileSize = file.size;
     const ext = path.extname(file.name);
     const allowedTypes = [".png", ".jpg", ".jpeg", ".pdf", ".docx"];

     if (!allowedTypes.includes(ext.toLowerCase())) {
       return res.status(422).json({ msg: "Format Tidak Mendukung" });
     }

     if (fileSize > 5000000) {
       return res.status(422).json({ msg: "File Tidak Bisa Lebih Dari 5 MB" });
     }

     const timestamp = new Date().getTime(); // Waktu saat ini sebagai timestamp
     const uniqueFileName = `${timestamp}_${file.md5}${ext}`; // Menggabungkan timestamp dan nama file yang unik
     const url = `${req.protocol}://${req.get(
       "host"
     )}/lisensi/${uniqueFileName}`;

     file.mv(`./public/lisensi/${uniqueFileName}`, async (err) => {
       if (err) {
         return res.status(500).json({ msg: err.message });
       } else {
         const { id_pelatih, nama } = req.body;

         try {
           await LisensiPelatih.create({
             id_pelatih : id_pelatih,
             nama : nama,
             file: uniqueFileName, 
             url: url,
           });
           res.status(200).json({ msg: "File Berhasil Terupload" });
         } catch (error) {
           res.status(404).json({ msg: "File Gagal Terupload" });
         }
       }
     });
    
}

export const deleteLisensiPelatih = async (req, res) => {
    const panduan = await LisensiPelatih.findOne({
      where: {
        id_Lisensi: req.params.id,
      },
    });
    if (!panduan) return res.status(404).json({ msg: "No Data Found" });

    try {
      const filepath = `./public/lisensi/${panduan.file}`;
      fs.unlinkSync(filepath);
      await panduan.destroy();
      res.status(200).json({ msg: "Lisensi Deleted Successfuly" });
    } catch (error) {
      console.log(error.message);
    }
}

