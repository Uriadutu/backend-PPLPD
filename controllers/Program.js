import Cabor from "../models/Cabormodels.js";
import Program from "../models/ProgramModels.js";
import fs from "fs";
import path from "path";

export const getProgram = async (req, res)=> {
    try {
        const response = await Program.findAll({
            attributes : ["id_program", "nama_program","id_cabor", "File", "url"]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({msg : "Data Tidak Ditemukan"});
    }
}

export const getProgrambyId = async (req, res)=> {
    try {
        const response = await Program.findOne({
            where : {
                id_program : req.params.id
            },
            attributes : ["id_program", "nama_Program","id_cabor", "File", "url"]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({msg : "Data Tidak Ditemukan"});
    }
}

export const getProgrambyCabor = async (req, res)=> {
     try {
       const response = await Program.findAll({
         where: {
           id_cabor: req.params.id,
         },
         attributes: ["id_program", "nama_Program", "id_cabor", "File", "url"],
         include : [{
            model : Cabor,
            attributes : ["namaCabor"],
         }]
       });
       res.status(200).json(response);
     } catch (error) {
       res.status(404).json({ msg: "Data Tidak Ditemukan" });
     }

}

export const createProgram = async (req, res) => {
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
  const url = `${req.protocol}://${req.get("host")}/program/${uniqueFileName}`;

  file.mv(`./public/program/${uniqueFileName}`, async (err) => {
    if (err) {
      return res.status(500).json({ msg: err.message });
    } else {
      const { id_cabor} = req.body;
      const nama_program = req.body.title;

      try {
        await Program.create({
            id_cabor : id_cabor,
            nama_Program: nama_program,
            File: uniqueFileName, // Simpan nama file yang unik di database
            url: url,
        });
        res.status(200).json({ msg: "File Berhasil Terupload" });
      } catch (error) {
        res.status(404).json({ msg: "File Gagal Terupload" });
      }
    }
  });
};

export const deleteProgram = async (req, res)=> {
    const programs = await Program.findOne({
      where: {
        id_program: req.params.id,
      },
    });
    if (!programs) return res.status(404).json({ msg: "No Data Found" });

    try {
      const filepath = `./public/program/${programs.File}`;
      fs.unlinkSync(filepath);
      await Program.destroy({
        where: {
          id_program: req.params.id,
        },
      });
      res.status(200).json({ msg: "panduan Deleted Successfuly" });
    } catch (error) {
      console.log(error.message);
    }

}
