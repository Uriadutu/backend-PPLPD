import argon2, { hash } from "argon2";
import Admin from "../models/Adminmodels.js";
import Gambar from "../models/GambarModels.js";

export const getAdmin = async (req, res) => {
    try {
        const response = await Admin.findAll({
            attributes: ['uuid', 'no_hp', 'nama', 'username', 'password', 'role']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getAdminById = async(req, res) => {
    try {
      const response = await Admin.findOne({
        attributes: ["uuid", "no_hp", "nama", "username", "password", "role"],
        where: {
          uuid: req.params.id,
        },
      });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }

}

export const createAdmin = async(req, res) => {
    const {nama, no_hp, username, password, confPassword} = req.body;
    if (password !== confPassword)
      return res
        .status(400).json({ msg: "Password dan confirm password tidak sama" });
    const hashPassword = await argon2.hash(password);
    try {
      await Admin.create({
        id_admin : username,
        nama : nama,
        no_hp : no_hp,
        username: username,
        password: hashPassword,
        role: "Admin"
      });
      res.status(201).json({ msg: "Register Berhasil" });
    } catch (error) {
      res.status(400).json({ msg: "Harap Masukan Semua Field"});
    }
}

export const updateAdmin = async (req, res) => {
    const Admina = await Admin.findOne({
      where: {
        uuid: req.params.id
      },
    });
    if (!Admina) return res.status(404).json({msg: "Data  Admin sudah terupdate"});
    const { nama, username, password, role, confPassword } = req.body;
    let hashPassword;
    if(password === "" || password === null){
        hashPassword = Admina.password
    } else {
        hashPassword = await argon2.hash(password);
    }
    if (password !== confPassword) return res.status(400).json({ msg: "Password dan confirm password tidak sama" });
    try {
      await Admin.update({
        id_admin : username,
        nama: nama,
        username: username,
        password: hashPassword
      }, {
        where : {
          id_admin: Admina.id_admin
        }
      });
      res.status(200).json({ msg: "Data Telah Terupdate" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
};

export const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!admin) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    await admin.destroy(); // Hapus data admin dengan model Sequelize
    res.status(200).json({ msg: "Data telah dihapus" });
  } catch (error) {
    res.status(500).json({ msg: "Terjadi kesalahan dalam menghapus data" });
  }
};
