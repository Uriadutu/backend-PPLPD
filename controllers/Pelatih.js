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
export const getPelatihByclub = async (req, res) => {
    try {
        const response = await Pelatih.findAll({
          where: {
            club: req.params.id,
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
      club,
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
      status_ayah, // baru
      tmpLahir_ayah,
      tglLahir_ayah,
      agama_ayah,
      pekerjaan_ayah,
      noHp_ayah,
      notlp_ayah,
      email_ayah,
      nama_ibu,
      status_ibu, // baru
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
      // baru
      provinsi_ibu,
      kota_ibu,
      kecamatan_ibu,
      kelurahan_ibu,
      desa_ibu,
      namaJalan_ibu,
      //batas
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
    const initials = getInitials(name_awal?.toLowerCase());
    const Passing = initials + nama_akhir?.toLowerCase() + noDaftar + 1;
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
            club : id_cabor + "0",
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
            status_ayah : status_ayah,
            tmpLahir_ayah: tmpLahir_ayah,
            tglLahir_ayah: tglLahir_ayah,
            agama_ayah: agama_ayah,
            pekerjaan_ayah: pekerjaan_ayah,
            noHp_ayah: noHp_ayah,
            notlp_ayah: notlp_ayah,
            email_ayah: email_ayah,
            nama_ibu: nama_ibu,
            status_ibu : status_ibu,
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
            provinsi_ibu: provinsi_ibu,
            kota_ibu: kota_ibu,
            kecamatan_ibu: kecamatan_ibu,
            kelurahan_ibu: kelurahan_ibu,
            desa_ibu: desa_ibu,
            namaJalan_ibu: namaJalan_ibu,
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
            username: id_cabor + tahun_daftar.slice(-1) + noDaftar + 1,
            id_pelatih: tahun_daftar.slice(-1) + id_cabor + noDaftar,
            password: hashPassword,
            nama: name_awal + " " + nama_tengah + " " + nama_akhir,
            Pass: PW,
          });

          res.status(200).json({ msg: "Data berhasil diupdate" });
        } catch (error) {
          res.status(500).json({ msg: "Lengkapi Field Yang Diperlukan" });
        }
      }
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updatePelatih = async (req, res) => {
  const atlet = await Pelatih.findOne({
    where: {
      id_pelatih: req.params.id,
    },
  });
  if (!atlet) return res.status(404).json({ msg: "atlet tidak ditemukan" });
  let fileName = atlet.gambar;
  if (req.files !== null) {
    const file = req.files.file;
    const timestamp = new Date().getTime();
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + timestamp + ext;
    const allowedType = [".jpg", ".jpeg", ".png"];
    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "File type not supported" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "File size too large (Max 5MB)" });

    const filePath = `./public/pelatih/${atlet.gambar}`;
    fs.unlinkSync(filePath);

    file.mv(`./public/pelatih/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  const {
    name_awal,
    status,
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
    ukuran_baju,
    ukuran_sepatu,
    nama_ayah,
    tmpLahir_ayah,
    tglLahir_ayah,
    agama_ayah,
    // baru
    status_ayah,
    pekerjaan_ayah,
    noHp_ayah,
    notlp_ayah,
    email_ayah,
    nama_ibu,
    // baru
    status_ibu,
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
    // baru
    provinsi_ibu,
    kota_ibu,
    kecamatan_ibu,
    kelurahan_ibu,
    desa_ibu,
    namaJalan_ibu,
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
    club,
    id_cabor,
  } = req.body;
  // let Passing = name_awal + tahun_daftar.slice(-2) + atlet.No_daftar;

  
  const noDaftar = atlet.No_daftar;

  // Gabungkan string dengan menggunakan template literals

    const namaKecil = nama_akhir
      ? nama_akhir.toLowerCase()
      : atlet.nama_akhir.toLowerCase();

    const initials = atlet.name_awal[0].toLowerCase()
    const Passing = initials + namaKecil + noDaftar + 1;
    const hashPassword = await argon2.hash(Passing);
    const PW = Passing;

  const url = `${req.protocol}://${req.get("host")}/pelatih/${fileName}`;
  try {
    await atlet.update(
      {
        name_awal: name_awal,
        status: status,
        club: club,
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
        ukuran_baju: ukuran_baju,
        ukuran_sepatu: ukuran_sepatu,
        nama_ayah: nama_ayah,
        // baru
        status_ayah: status_ayah,
        tmpLahir_ayah: tmpLahir_ayah,
        tglLahir_ayah: tglLahir_ayah,
        agama_ayah: agama_ayah,
        pekerjaan_ayah: pekerjaan_ayah,
        noHp_ayah: noHp_ayah,
        notlp_ayah: notlp_ayah,
        email_ayah: email_ayah,
        nama_ibu: nama_ibu,
        // baru
        status_ibu: status_ibu,
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
        // baru
        provinsi_ibu: provinsi_ibu,
        kota_ibu: kota_ibu,
        kecamatan_ibu: kecamatan_ibu,
        kelurahan_ibu: kelurahan_ibu,
        desa_ibu: desa_ibu,
        namaJalan_ibu: namaJalan_ibu,
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
        tahun_daftar: tahun_daftar,
        id_admin: req.userId,
        password: hashPassword,
        nama: name_awal + " " + nama_tengah + " " + nama_akhir,
        Pass: PW,
      },
      {
        where: {
          id_pelatih: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "berhasil diupdate" });
  } catch (error) {
    console.log(error.message);
  }
};

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
