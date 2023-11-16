import Atlet from "../models/Atletmodels.js";
import argon2 from "argon2";
import Cabor from "../models/Cabormodels.js";
import Gambar from "../models/GambarModels.js";


export const getAtlet = async(req, res) => {
    try {
        const response = await Atlet.findAll({
          attributes: [
            "id_atlet",
            "uuid",
            "nama",
            "Pass",
            "id_cabor",
            "id_gambar",
            "tahun_daftar",
            "name_awal",
            "nama_tengah",
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
          include: [
            {
              model: Cabor,
              attributes: ["id_cabor", "namaCabor", "kodeCabor"],
            },
            {
              model: Gambar,
              attributes: ["image", "url"],
            },
          ],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
}
};
export const getAtletbyCabor = async(req, res) => {
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
            "Pass",
            "role",
          ],
          where: {
            id_cabor: req.params.id,
          },
          include: [
            {
              model: Cabor,
              attributes: ["id_cabor", "namaCabor", "kodeCabor"],
            },
            {
              model: Gambar,
              attributes: ["image", "url"],
            },
          ],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
}
};

export const countAtletByCabor = async (req, res) => {
  try {
    const atletCount = await Atlet.count({
      attributes: ["id_cabor"],
      group: ["id_cabor"],
    });    
    const result = atletCount.reduce((acc, row) => {
      acc[row.id_cabor] = row.count;
      return acc;
    }, {});

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}; 

export const getAtletByuuid = async (req, res) => {
  try {
    const response = await Atlet.findOne({
      attributes: [
        "id_atlet",
        "uuid",
        "nama",
        "Pass",
        "id_cabor",
        "id_gambar",
        "tahun_daftar",
        "name_awal",
        "nama_tengah",
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
        uuid: req.params.id,
      },
      include: [
        {
          model: Cabor,
          attributes: ["id_cabor", "namaCabor", "kodeCabor"],
        },
        {
          model: Gambar,
          attributes: ["id_gambar", "url", "image"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


export const getAtletById = async (req, res) => {
  try {
    const response = await Atlet.findOne({
      attributes: [
        "id_atlet",
        "uuid",
        "nama",
        "Pass",
        "id_cabor",
        "id_gambar",
        "tahun_daftar",
        "name_awal",
        "nama_tengah",
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
        id_atlet: req.params.id,
      },
      include: [
        {
          model: Cabor,
          attributes: ["id_cabor", "namaCabor", "kodeCabor"],
        },
        {
          model: Gambar,
          attributes: ["id_gambar", "url", "image"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createAtlet = async(req, res) => {
  try {
    const {
      name_awal,
      id_cabor,
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
      const maxNoDaftar = await Atlet.max("No_daftar");

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
    const Passing = name_awal.toLowerCase() + id_cabor + noDaftar;
    const hashPassword = await argon2.hash(Passing);
    const PW = Passing;


     const gambar = await Gambar.findOne({
      // Tentukan kondisi di sini, misalnya berdasarkan ID Gambar terbaru.
      order: [["id_gambar", "DESC"]],
    });

    // Anda bisa menggunakan ID Gambar yang sesuai dari hasil query di atas.
    const id_gambar = gambar ? gambar.id_gambar : null;

          await Atlet.create({
            name_awal: name_awal,
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
            id_gambar: id_gambar,
            username: id_cabor + tahun_daftar.slice(-2) + noDaftar,
            id_atlet: tahun_daftar.slice(-2) + id_cabor + noDaftar,
            password: hashPassword,
            nama: name_awal + " " + nama_tengah + " " + nama_akhir,
            Pass: PW,
          });

  } catch (error) {
    res.status(400).json({ msg: error.message });
  }

};


export const updateAtlet = (req, res) => {};

export const deleteAtlet = async(req, res) => {
  try {
    const atlets = await Atlet.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!atlets) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }
    await atlets.destroy();
    res.status(200).json({ msg: "Data terhapus" });
  } catch (error) {
    res.status(404).json({ msg: "Terjadi kesalahan dalam menghapus data" });
  }
  //gambar 
  
};

export const deleteAtletfile = async (req, res) => {
  try {
    const atlets = await Atlet.findOne({
      where: {
        id_atlet: req.params.id,
      },
      include: [
        {
          model: Gambar,
          attributes: ["id_gambar", "image"],
        },
      ],
    });
    
    if (!atlets) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    const id_gambar = atlets.Gambar.id_gambar;
    const image = atlets.Gambar.image;

    // Hapus data atlet
    await atlets.destroy();

    // Hapus gambar terkait
    const filepath = `./public/images/${atlets.image}`;
    fs.unlinkSync(filepath);

    await Gambar.destroy({
      where: {
        id_gambar: id_gambar,
      },
    });

    res.status(200).json({ msg: "Data dan gambar terhapus" });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ msg: "Terjadi kesalahan dalam menghapus data" });
  }
};

