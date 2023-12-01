import Admin from "../models/Adminmodels.js";
import Atlet from "../models/Atletmodels.js";
import argon2 from "argon2";
import Cabor from "../models/Cabormodels.js";
import SuperAdmin from "../models/SuperAdmin.js";
import Pelatih from "../models/Pelatihmodels.js";

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
    });
    const pelatih = await Pelatih.findOne({
      where: {
        username: req.body.username,
      },
    });


    if (admin || atlet || adminSuper || pelatih) {
      user = admin || atlet || adminSuper || pelatih;
      const match = await argon2.verify(user.password, req.body.password);
      if (!match) {
        return res.status(400).json({ msg: "Password salah" });
      }
    } else {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }

    // Periksa status atlet jika ada
    if (user && user.status === "Tidak Aktif") {
      return res.status(403).json({ msg: "Akun Anda sudah tidak aktif" });
    }
    // Berhasil login
    req.session.userId = user.uuid;
    const { uuid, username, role } = user;
    const nama = user.nama; // Jika kolom 'nama' tersedia di tabel Atlet
    const id = user.id_atlet || user.id_admin || user.id_Super || user.id_pelatih;
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
      where: {
        uuid: req.session.userId,
      },
      include: [
        {
          model: Cabor,
          attributes: ["namaCabor", "id_cabor"],
        },
      ],
    });

    const pelatih = await Pelatih.findOne({
      
      where: {
        uuid: req.session.userId,
      },
      include: [
        {
          model: Cabor,
          attributes: ["namaCabor", "id_cabor"],
        },
      ],
    });

    if (admin) {
      user = admin;
    } else if (atlet) {
      user = atlet;
    } else if (SAdmin) {
      user = SAdmin;
    } else {
      user = pelatih;
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
