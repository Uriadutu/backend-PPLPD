import Admin from "../models/Adminmodels.js";
import Cabor from "../models/Cabormodels.js";
import Pelatih from "../models/Pelatihmodels.js";
import argon2 from "argon2"
import fs from "fs"
import path from "path";

export const getPelatih = async (req, res) => {
  try {
    const response = await Pelatih.findAll({
      include: [
        {
          model: Cabor,
          attributes: ["namaCabor"],
        },
        {
          model: Admin,
          attributes: ["nama"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({msg : "Data tidak ditemukan"})
  }
};

export const getPelatihById = async (req, res) => {
    try {
        const response = await Pelatih.findOne({
          where: {
            id_pelatih: req.params.id,
          },
          include: [
            {
              model: Cabor,
              attributes: ["namaCabor"],
            },
            {
              model: Admin,
              attributes: ["nama"],
            },
          ],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({msg : "Datat tidak ditemukan"})
    }
};
export const getPelatihByuuid = async (req, res) => {
    try {
        const response = await Pelatih.findOne({
          where: {
            uuid: req.params.id,
          },
          include: [
            {
              model: Cabor,
              attributes: ["id_cabor", "namaCabor"],
            },
            {
              model: Admin,
              attributes: ["nama"],
            }, 
          ],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({msg : "Datat tidak ditemukan"})
    }
};

export const getPelatihByCabor = async (req, res) => {
    try {
        const response = await Pelatih.findAll({
          where: {
            id_cabor: req.params.id,
          },
          include: [
            {
              model: Cabor,
              attributes: ["namaCabor", "id_cabor"],
            },
            {
              model: Admin,
              attributes: ["nama"],
            },
          ],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({msg : "Datat tidak ditemukan"})
    }
};

export const createPelatih = async (req, res) => {
  try {
    const {
      name_awal,
      id_cabor,
      status,
      No_daftar,
      tahun_daftar,
      nama_akhir,
      nama_tengah,
      nama_panggil,
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
      nama_ayah,
      tmpLahir_ayah,
      tglLahir_ayah,
      agama_ayah,
      pekerjaan_ayah,
      noHp_ayah,
      notlp_ayah,
      email_ayah,
      nama_ibu,
      tmpLahir_ibu,
      tglLahir_ibu,
      agama_ibu,
      pekerjaan_ibu,
      noHp_ibu,
      notlp_ibu,
      email_ibu,
      provinsi_ortu,
      kota_ortu,
      kecamatan_ortu,
      kelurahan_ortu,
      desa_ortu,
      namaJalan_ortu,
      nama_wali,
      hubkeluarga_wali,
      tempLahir_wali,
      tglLahir_wali,
      agama_wali,
      jeniskelamin_wali,
      pekerjaan_wali,
      noHp_wali,
      notlp_wali,
      email_wali,
      provinsi_wali,
      kota_wali,
      kecamatan_wali,
      kelurahan_wali,
      desa_wali,
      namaJalan_wali,
      nama_club,
      nama_event,
      tahun_prestasi,
      capai_prestasi,
    } = req.body;

    let noDaftar;

    if (!No_daftar || No_daftar === "") {
      const maxNoDaftar = await Pelatih.max("No_daftar");

      if (maxNoDaftar === null) {
        noDaftar = "001";
      } else {
        const nextNoDaftar = (parseInt(maxNoDaftar) + 1)
          .toString()
          .padStart(3, "0");
        noDaftar = nextNoDaftar;
      }
    } else {
      noDaftar = No_daftar;
    }
    const getInitials = (str) => {
      return str
        .split(" ")
        .map((word) => word.charAt(0)) // Mengambil karakter pertama dari setiap kata
        .join(""); // Menggabungkan karakter-karakter pertama
    };
    const initials = getInitials(name_awal.toLowerCase());
    const Passing = initials + nama_akhir.toLowerCase() + tahun_daftar.slice(-2) + noDaftar;
    const hashPassword = await argon2.hash(Passing);
    const PW = Passing;

    if (!req.files || !req.files.file) {
      return res.status(400).json({ msg: "Harap Upload Gambar" });
    }

    const file = req.files.file;
    const timestamp = new Date().getTime();
    const fileSize = file.size;
    const ext = path.extname(file.name);
    const allowedTypes = [".png", ".jpg", ".jpeg", ".mp4"];

    if (!allowedTypes.includes(ext.toLowerCase())) {
      return res.status(422).json({ msg: "Invalid Image Type" });
    }

    if (fileSize > 50000000) {
      return res.status(422).json({ msg: "Image lebih dari 5 mb" });
    }

    const fileName = `${file.md5}${timestamp}${ext}`;
    const url = `${req.protocol}://${req.get("host")}/pelatih/${fileName}`;

    file.mv(`./public/pelatih/${fileName}`, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ msg: "Internal Server Error" });
      } else {
        try {
          await Pelatih.create({
            name_awal: name_awal,
            status: status,
            gambar: fileName,
            url: url,
            nama_tengah: nama_tengah,
            nama_akhir: nama_akhir,
            nama_panggil: nama_panggil,
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
            nama_ayah: nama_ayah,
            tmpLahir_ayah: tmpLahir_ayah,
            tglLahir_ayah: tglLahir_ayah,
            agama_ayah: agama_ayah,
            pekerjaan_ayah: pekerjaan_ayah,
            noHp_ayah: noHp_ayah,
            notlp_ayah: notlp_ayah,
            email_ayah: email_ayah,
            nama_ibu: nama_ibu,
            tmpLahir_ibu: tmpLahir_ibu,
            tglLahir_ibu: tglLahir_ibu,
            agama_ibu: agama_ibu,
            pekerjaan_ibu: pekerjaan_ibu,
            noHp_ibu: noHp_ibu,
            notlp_ibu: notlp_ibu,
            email_ibu: email_ibu,
            provinsi_ortu: provinsi_ortu,
            kota_ortu: kota_ortu,
            kecamatan_ortu: kecamatan_ortu,
            kelurahan_ortu: kelurahan_ortu,
            desa_ortu: desa_ortu,
            namaJalan_ortu: namaJalan_ortu,
            nama_wali: nama_wali,
            hubkeluarga_wali: hubkeluarga_wali,
            tempLahir_wali: tempLahir_wali,
            tglLahir_wali: tglLahir_wali,
            agama_wali: agama_wali,
            jeniskelamin_wali: jeniskelamin_wali,
            pekerjaan_wali: pekerjaan_wali,
            noHp_wali: noHp_wali,
            notlp_wali: notlp_wali,
            email_wali: email_wali,
            provinsi_wali: provinsi_wali,
            kota_wali: kota_wali,
            kecamatan_wali: kecamatan_wali,
            kelurahan_wali: kelurahan_wali,
            desa_wali: desa_wali,
            namaJalan_wali: namaJalan_wali,
            nama_club: nama_club,
            nama_event: nama_event,
            tahun_prestasi: tahun_prestasi,
            capai_prestasi: capai_prestasi,
            tahun_daftar: tahun_daftar,
            No_daftar: noDaftar,
            id_cabor: id_cabor,
            id_admin: req.userId,
            username: id_cabor + tahun_daftar.slice(-2) + noDaftar,
            id_pelatih: tahun_daftar.slice(-2) + id_cabor + noDaftar,
            password: hashPassword,
            nama: name_awal + " " + nama_tengah + " " + nama_akhir,
            Pass: PW,
          });

          res.status(200).json({ msg: "Data berhasil ditambahkan" });
        } catch (error) {
          res.status(500).json({ msg: "Internal Server Error" });
        }
      }
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updatePelatih = async (req, res) => {};

export const deletePelatih = async (req, res) => {
   try {
     const pelatih = await Pelatih.findOne({
       where: {
         id_pelatih: req.params.id,
       },
     });

     if (!pelatih) {
       return res.status(404).json({ msg: "Data tidak ditemukan" });
     }
     // Hapus data atlet
     await pelatih.destroy();

     // Hapus gambar terkait
     const filepath = `./public/pelatih/${pelatih.gambar}`;
     fs.unlinkSync(filepath);

     res.status(200).json({ msg: "Data dan gambar terhapus" });
   } catch (error) {
     console.log(error.message);
     res.status(404).json({ msg: "Terjadi kesalahan dalam menghapus data" });
   }
};
