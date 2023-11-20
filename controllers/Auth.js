import Admin from "../models/Adminmodels.js";
import Atlet from "../models/Atletmodels.js";
import argon2 from "argon2";
import Gambar from "../models/GambarModels.js";
import Cabor from "../models/Cabormodels.js";
import SuperAdmin from "../models/SuperAdmin.js";

export const Login = async (req, res) => {
  try {
    let user = null;

    const admin = await Admin.findOne({
      where: {
        username: req.body.username,
      },
    });

    const atlet = await Atlet.findOne({
      where: {
        username: req.body.username,
      },
    });

    const adminSuper = await SuperAdmin.findOne({
      where : {
        username : req.body.username,
      }
    })

    if (admin || atlet || adminSuper) {
      user = admin || atlet || adminSuper ;
      const match = await argon2.verify(user.password, req.body.password);
      if (!match) {
        return res.status(400).json({ msg: "Password salah" });
      }
    } else {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }

    // Periksa status atlet jika ada
    if (user && user.status === "tidakAktif") {
      return res.status(403).json({ msg: "Akun Anda sudah tidak aktif" });
    }

    // Tambahkan pengecekan lainnya jika perlu

    // Berhasil login
    req.session.userId = user.uuid;
    const { uuid, username, role } = user;
    const nama = user.nama; // Jika kolom 'nama' tersedia di tabel Atlet
    const id = user.id_atlet || user.id_admin || user.id_Super;
    res.status(200).json({ id, uuid, nama, username, role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Terjadi kesalahan dalam proses login" });
  }
};

export const Me = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ msg: "Mohon login ke akun Anda" });
    }

    let user = null;

    const admin = await Admin.findOne({
      attributes: ["id_admin", "nama", "uuid", "username", "role"],
      where: {
        uuid: req.session.userId,
      },
    });
    
    const SAdmin = await SuperAdmin.findOne({
      attributes: ["id_Super", "nama", "uuid", "username", "role"],
      where: {
        uuid: req.session.userId,
      },
    });

    const atlet = await Atlet.findOne({
      attributes: ["id_atlet", "nama", "uuid", "username", "role","Pass", "id_cabor", "email", "nama_akhir"],
      where: {
        uuid: req.session.userId,
      },
      include : [{
        model : Gambar,
        attributes : ["url", "image"],
      }, {
        model : Cabor,
        attributtes : ["namaCabor"]
      }],

    
    });

    if (admin) {
      user = admin;
    } else if (atlet) {
      user = atlet;
    } else {
      user = SAdmin;
    }
 
    if (user) {
      res.status(200).json(user);
    } else {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }
  } catch (error) {
    console.error("Terjadi Kesalahan:", error);
    res.status(500).json({
      msg: "Terjadi kesalahan",
    });
  }
};


export const Logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
    res.status(200).json({ msg: "logout telah berhasil" });
  });
};
