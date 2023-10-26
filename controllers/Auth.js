import Admin from "../models/Adminmodels.js";
import Atlet from "../models/Atletmodels.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
  try {
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

    if (admin || atlet) {
      const user = admin || atlet;
      const match = await argon2.verify(user.password, req.body.password);
      if (match) {
        // Berhasil login
        req.session.userId = user.uuid;
        const { uuid, username, role } = user;
        const nama = user.nama; // Jika kolom 'nama' tersedia di tabel Atlet
        const id = user.id_atlet || user.id_admin;
        res.status(200).json({ id, uuid, nama, username, role });
      } else {
        res.status(400).json({ msg: "Password salah" });
      }
    } else {
      res.status(404).json({ msg: "User tidak ditemukan" });
    }
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

    const atlet = await Atlet.findOne({
      attributes: ["id_atlet", "nama", "uuid", "username", "role"],
      where: {
        uuid: req.session.userId,
      },
    });

    if (admin) {
      user = admin;
    } else if (atlet) {
      user = atlet;
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
