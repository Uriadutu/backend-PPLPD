import Admin from "../models/Adminmodels.js";
import Forum from "../models/ForumModels.js";
import IsiForum from "../models/ISIForumModels.js";
import fs from "fs";
import path from "path";

export const getChatbyForum = async (req, res) => {
  try {
    const response = await IsiForum.findAll({
      where: {
        id_forum: req.params.id,
      },
      attributes: [
        "id_isiforum",
        "id_admin",
        "id_pelatih",
        "id_Super",
        "pesan",
        "File",
        "url",
        "jam",
      ],
      include: [
        {
          model: Forum,
          attributes: ["namaForum"],
        },
        {model : Admin,
        attributes : ["nama"]}
      ],

    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: "Chat Kosong" });
  }
};

export const createChat = async (req, res) => {
  const { id_forum } = req.body;
  const pesan  = req.body.title;

  try {
    let id_admin = null;
    let id_Super = null;

    // Periksa peran pengguna dan tentukan id_admin atau id_Super
    if (req.role === "Admin") {
      id_admin = req.userId;
    }

    if (req.role === "SuperAdmin") {
      id_Super = req.userId;
    }

    // Jika tidak ada file yang diupload
    if (!req.files || !req.files.file) {
      // Buat entri chat tanpa file
      await IsiForum.create({
        id_admin: id_admin,
        id_Super: id_Super,
        id_forum: id_forum,
        pesan: pesan,
      });

      // Beritahu bahwa data berhasil terkirim tanpa file
      return res.status(200).json({ msg: "Data berhasil terkirim tanpa file" });
    }

    // Jika ada file yang diupload
    const file = req.files.file;
    const fileSize = file.size;
    const ext = path.extname(file.name);
    const allowedTypes = [".png", ".jpg", ".jpeg"];

    // Lakukan validasi file
    if (!allowedTypes.includes(ext.toLowerCase())) {
      return res.status(422).json({ msg: "Format Tidak Mendukung" });
    }

    if (fileSize > 5000000) {
      return res.status(422).json({ msg: "File Tidak Bisa Lebih Dari 5 MB" });
    }

    // Lakukan proses upload file
    const timestamp = new Date().getTime();
    const uniqueFileName = `${timestamp}_${file.md5}${ext}`;
    const url = `${req.protocol}://${req.get("host")}/chat/${uniqueFileName}`;

    file.mv(`./public/chat/${uniqueFileName}`, async (err) => {
      if (err) {
        return res.status(500).json({ msg: err.message });
      } else {
        // Simpan data chat dengan file yang diupload
        await IsiForum.create({
          id_admin: id_admin,
          id_Super: id_Super,
          id_forum: id_forum,
          pesan: pesan,
          File: uniqueFileName,
          url: url,
        });
        res.status(200).json({ msg: "File Berhasil Terupload" });
      }
    });
  } catch (error) {
    res.status(500).json({ msg: "Terjadi kesalahan saat mengirim data" });
  }
};

export const deleteChat = async (req, res) => {};
