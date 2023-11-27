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
      where : {
        username : req.body.username,
      }
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
    if (user && user.status === "tidakAktif") {
      return res.status(403).json({ msg: "Akun Anda sudah tidak aktif" });
    }

    // Tambahkan pengecekan lainnya jika perlu

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
      attributes: [
        "id_atlet",
        "uuid",
        "nama",
        "Pass",
        "url",
        "gambar",
        "id_cabor",
        "tahun_daftar",
        "name_awal",
        "nama_tengah",
        "status",
        "nama_akhir",
        "username",
        "role",
        "nama_panggil",
        "tgl_lahir",
        "tmp_lahir",
        "agama",
        "nama_jalan",
        "desa",
        "kelurahan",
        "kecamatan",
        "kota",
        "provinsi",
        "no_telp",
        "hp_mobile",
        "email",
        "kelamin",
        "gol_darah",
        "tinggi_badan",
        "berat_badan",
        "pendidikan",
        "pend_terakhir",
        "nama_sklh",
        "alumni",
        "tahun_lulus",
        "ukuran_baju",
        "ukuran_sepatu",
        "nama_ayah",
        "tmpLahir_ayah",
        "tglLahir_ayah",
        "agama_ayah",
        "pekerjaan_ayah",
        "noHp_ayah",
        "notlp_ayah",
        "email_ayah",
        "nama_ibu",
        "tmpLahir_ibu",
        "tglLahir_ibu",
        "agama_ibu",
        "pekerjaan_ibu",
        "noHp_ibu",
        "notlp_ibu",
        "email_ibu",
        "provinsi_ortu",
        "kota_ortu",
        "kecamatan_ortu",
        "kelurahan_ortu",
        "desa_ortu",
        "namaJalan_ortu",
        "nama_wali",
        "hubkeluarga_wali",
        "tempLahir_wali",
        "tglLahir_wali",
        "agama_wali",
        "jeniskelamin_wali",
        "pekerjaan_wali",
        "noHp_wali",
        "notlp_wali",
        "email_wali",
        "provinsi_wali",
        "kota_wali",
        "kecamatan_wali",
        "kelurahan_wali",
        "desa_wali",
        "namaJalan_wali",
        "nama_club",
        "nama_event",
        "tahun_prestasi",
        "capai_prestasi",
      ],
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
      attributes: [
        "id_pelatih",
        "nama",
        "uuid",
        "url",
        "username",
        "role",
        "Pass",
        "id_cabor",
        "email",
        "nama_akhir",
      ],
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
