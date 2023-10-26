import Atlet from "../models/Atletmodels.js";
import argon2 from "argon2";

export const getAtlet = async(req, res) => {
    try {
        const response = await Atlet.findAll({
          attributes: [
            "id_atlet",
            "uuid",
            "nama",
            "name_awal",
            "nama_tengah",
            "nama_akhir",
            "username",
            "role",
          ],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
}
};
 

export const getAtletById = (req, res) => {};

export const createAtlet = async(req, res) => {
    const { 
        id_atlet,
        username,
    name_awal, 
    nama_tengah, 
    nama_akhir, 
    nama_panggil, 
    image,
    tgl_lahir, 
    tmp_lahir, 
    agama, 
    nama_jalan, 
    desa, 
    kelurahan, 
    kecamatan, 
    kota, 
    provinsi, 
    no_telp, 
    hp_mobile, 
    email, 
    kelamin,
    gol_darah, 
    tinggi_badan,
    berat_badan,
    pendidikan, 
    nama_sklh, 
    pend_terakhir, 
    alumni, 
    tahun_lulus, 
    ukuran_baju, 
    ukuran_sepatu,
    nama_ortu, 
    ttl, 
    jenis_kelamin, 
    hub_kel, 
    pekerjaan, 
    alamat, 
    telpOrtu, 
    namaClub, 
    namaEvent, 
    tahun, 
    prestasi, 
    password, 
    confPassword } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan confirm password tidak sama" });
  const hashPassword = await argon2.hash(password);
  try {
    await Atlet.create({
      name_awal: name_awal,
      nama_tengah: nama_tengah,
      nama_akhir: nama_akhir,
      nama_panggil: nama_panggil,
      image: image,
      tgl_lahir: tgl_lahir,
      tmp_lahir: tmp_lahir,
      agama: agama,
      nama_jalan: nama_jalan,
      desa: desa,
      kelurahan: kelurahan,
      kecamatan: kecamatan,
      kota: kota,
      provinsi: provinsi,
      no_telp: no_telp,
      hp_mobile: hp_mobile,
      email: email,
      kelamin: kelamin,
      gol_darah: gol_darah,
      tinggi_badan: tinggi_badan,
      berat_badan: berat_badan,
      pendidikan: pendidikan,
      nama_sklh: nama_sklh,
      pend_terakhir: pend_terakhir,
      alumni: alumni,
      tahun_lulus: tahun_lulus,
      ukuran_baju: ukuran_baju,
      ukuran_sepatu: ukuran_sepatu,
      nama_ortu: nama_ortu,
      ttl: ttl,
      jenis_kelamin: jenis_kelamin,
      hub_kel: hub_kel,
      pekerjaan: pekerjaan,
      alamat: alamat,
      telpOrtu: telpOrtu,
      namaClub: namaClub,
      namaEvent: namaEvent,
      tahun: tahun,
      prestasi: prestasi,
      username: name_awal + nama_akhir,
      id_atlet: name_awal + nama_akhir,
      password: hashPassword,
      nama : name_awal + " " + nama_akhir
    });
    res.status(201).json({ msg: "Register Berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }

};

export const updateAtlet = (req, res) => {};

export const deleteAtlet = (req, res) => {};
