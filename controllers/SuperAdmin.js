import SuperAdmin from "../models/SuperAdmin.js";
import argon2 from "argon2";

export const getSuperAdmin = async(req, res) => {
    try {
        const response = await SuperAdmin.findAll({
            attributes : ["id_super", "uuid", "nama", "username", "password", "role" ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({msg : "data tidak di temukan"})
    }
}

export const getSuperbyId = async(req, res) => {
    try {
      const response = await SuperAdmin.findAll({
        where : {
            id_super : req.params.id
        },
        attributes: ["id_super", "uuid", "nama", "username", "password", "role"],

      });
      res.status(200).json(response);
    } catch (error) {
      res.status(404).json({ msg: "data tidak di temukan" });
    }
}

export const createSuper = async(req, res) => {
    const {nama, username, password, confPassword } = req.body;
    if (password !== confPassword)
      return res
        .status(400)
        .json({ msg: "Password dan confirm password tidak sama" });
    const hashPassword = await argon2.hash(password);
    try {
      await SuperAdmin.create({

        id_Super: username,
        nama : nama,
        username: username,
        password: hashPassword,
        role: "SuperAdmin",
      });
      res.status(201).json({ msg: "Register Berhasil" });
    } catch (error) {
      res.status(400).json({ msg: "Harap Masukan Semua Field" });
    }
}
