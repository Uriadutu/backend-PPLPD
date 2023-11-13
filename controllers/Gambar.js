import Gambar from "../models/GambarModels.js";
import path from "path";
import fs from "fs";
import Atlet from "../models/Atletmodels.js";


export const getGambar = async(req, res) => {
  try {
    const response = await Gambar.findAll({
      attributes : [
        "id_gambar",
        "image", 
        "url"
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: "Data tidak ditemukan" });
    
  }
}

export const Addgambar = async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ msg: "Harap Upload Gambar" });
    }

    const file = req.files.file;
    const timestamp = new Date().getTime();
    const fileSize = file.size;
    const ext = path.extname(file.name);
    const allowedTypes = [".png", ".jpg", ".jpeg"];

    if (!allowedTypes.includes(ext.toLowerCase())) {
      return res.status(422).json({ msg: "Invalid Image Type" });
    }

    if (fileSize > 5000000) {
      return res.status(422).json({ msg: "Image must be less than 5 MB" });
    }

    const fileName = `${file.md5}${timestamp}${ext}`;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    file.mv(`./public/images/${fileName}`, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ msg: "Internal Server Error" });
      } else {
        try {
          // Temukan angka terbesar saat ini dari kolom id_gambar
          const maxIdGambar = await Gambar.max("id_gambar");
          const newIdGambar = maxIdGambar ? maxIdGambar + 1 : 1; // Tambahkan 1 ke angka terbesar, atau mulai dari 1 jika tidak ada data sebelumnya.

          await Gambar.create({
            id_gambar: newIdGambar,
            image: fileName,
            url: url,
          });

          res.status(200).json({ msg: "Gambar berhasil ditambahkan" });
        } catch (error) {
          console.error(error);
          res.status(500).json({ msg: "Internal Server Error" });
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const getGambarbyAtlet = async (req, res) => {
  try {
    const response = await Atlet.findOne({
      attributes: ["id_gambar", "url", "image"],
      where: {
        id_gambar: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: "Data Tidak Di Temukan" });
  }
};

export const deletefile = async (req, res) => {
  const id_atlet = await Atlet.findOne({
    where : {
      id_atlet : req.params.id,
    }, 
    include : {
      model : Gambar,
      attributes : ["id_gambar", "image"]
    }
  })

  const imageone = id_atlet.Gambar.image
  const idGambar = id_atlet.Gambar.id_gambar
  const gambar = await Gambar.findOne({
    where: {
      id_gambar: idGambar,
    }, 

    attributes : ["id_gambar"]
  });
  if (!gambar) return res.status(404).json({ msg: "No Data Found" });

  try {
    await id_atlet.destroy();
    const filepath = `./public/images/${imageone}`;
    fs.unlinkSync(filepath);
    await Gambar.destroy({
      where: {
        id_gambar: gambar.id_gambar,
      },
    });

    res.status(200).json({ msg: "panduan Deleted Successfuly" });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ msg: "panduan gagl Successfuly" });
  }
};