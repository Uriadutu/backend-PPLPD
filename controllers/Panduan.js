import Panduan from "../models/PanduanPelaksanaan.js";
import path from "path";
import fs from "fs";

export const getPanduan = async(req, res) => {
    try {
        const response = await Panduan.findAll({
          attributes: ["id_panduan", "nama", "file", "url", "format"],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({msg: "Data Tidak Di Temukan"});
    }
}

export const CreatePanduan = async (req, res) => {
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
  const url = `${req.protocol}://${req.get("host")}/file/${uniqueFileName}`;

  file.mv(`./public/file/${uniqueFileName}`, async (err) => {
    if (err) {
      return res.status(500).json({ msg: err.message });
    } else {
      const nama = req.body.title;

      try {
        await Panduan.create({
          nama: nama,
          file: uniqueFileName, // Simpan nama file yang unik di database
          url: url,
          format: ext.slice(1), // Menghapus titik (.) dari ekstensi untuk format
        });
        res.status(200).json({ msg: "File Berhasil Terupload" });
      } catch (error) {
        res.status(404).json({ msg: "File Gagal Terupload" });
      }
    }
  });
};


export const DeletePanduan = async(req, res) => {
     const panduan = await Panduan.findOne({
       where: {
         id_panduan: req.params.id,
       },
     });
     if (!panduan) return res.status(404).json({ msg: "No Data Found" });

     try {
       const filepath = `./public/File/${panduan.file}`;
       fs.unlinkSync(filepath);
       await Panduan.destroy({
         where: {
           id_panduan: req.params.id,
         },
       });
       res.status(200).json({ msg: "panduan Deleted Successfuly" });
     } catch (error) {
       console.log(error.message);
     }
}

