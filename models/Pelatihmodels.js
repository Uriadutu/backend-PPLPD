import { Sequelize, UUIDV4 } from "sequelize";
import db from "../config/Database.js";
import Cabor from "./Cabormodels.js";
import Admin from "./Adminmodels.js";

const { DataTypes } = Sequelize;

const Pelatih = db.define(
  "Pelatih",
  {
    id_pelatih: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Aktif",
    },
    club: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
    },
    nama: {
      type: DataTypes.STRING,
    },
    // INI BATAS BARU
    id_admin: DataTypes.STRING,
    id_cabor: {
      type: DataTypes.INTEGER,
    },
    gambar: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    },

    tahun_daftar: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [4, 4],
      },
    },
    No_daftar: {
      type: DataTypes.STRING,
      defaultValue: "001",
    },
    // INI LAGI
    name_awal: {
      type: DataTypes.TEXT,
    },
    nama_tengah: {
      type: DataTypes.TEXT,
    },
    nama_akhir: {
      type: DataTypes.TEXT,
    },

    nama_panggil: {
      type: DataTypes.TEXT,
    },
    tgl_lahir: {
      type: DataTypes.TEXT,
    },
    tmp_lahir: {
      type: DataTypes.TEXT,
    },

    agama: {
      type: DataTypes.TEXT,
    },

    nama_jalan: {
      type: DataTypes.TEXT,
    },

    desa: {
      type: DataTypes.TEXT,
    },

    kelurahan: {
      type: DataTypes.TEXT,
    },

    kecamatan: {
      type: DataTypes.TEXT,
    },

    kota: {
      type: DataTypes.TEXT,
    },

    provinsi: {
      type: DataTypes.TEXT,
    },

    no_telp: {
      type: DataTypes.TEXT,
    },

    hp_mobile: {
      type: DataTypes.TEXT,
    },

    email: {
      type: DataTypes.TEXT,
    },

    kelamin: {
      type: DataTypes.TEXT,
    },

    gol_darah: {
      type: DataTypes.TEXT,
    },

    tinggi_badan: {
      type: DataTypes.TEXT,
    },

    berat_badan: {
      type: DataTypes.TEXT,
    },
    // pendidikan

    pendidikan: {
      type: DataTypes.TEXT,
    },

    nama_sklh: {
      type: DataTypes.TEXT,
    },
    pend_terakhir: DataTypes.TEXT,
    alumni: DataTypes.TEXT,

    tahun_lulus: DataTypes.TEXT,

    ukuran_baju: {
      type: DataTypes.TEXT,
    },

    ukuran_sepatu: {
      type: DataTypes.TEXT,
    },

    //data ortu
    // ayah
    nama_ayah: {
      type: DataTypes.TEXT,
    },
    status_ayah: {
      type: DataTypes.TEXT,
    },
    tmpLahir_ayah: {
      type: DataTypes.TEXT,
    },

    tglLahir_ayah: {
      type: DataTypes.TEXT,
    },

    agama_ayah: {
      type: DataTypes.TEXT,
    },

    pekerjaan_ayah: {
      type: DataTypes.TEXT,
    },

    noHp_ayah: {
      type: DataTypes.TEXT,
    },

    notlp_ayah: {
      type: DataTypes.TEXT,
    },

    email_ayah: {
      type: DataTypes.TEXT,
    },

    //data ibu

    nama_ibu: {
      type: DataTypes.TEXT,
    },
    status_ibu: {
      type: DataTypes.TEXT,
    },

    tmpLahir_ibu: {
      type: DataTypes.TEXT,
    },

    tglLahir_ibu: {
      type: DataTypes.TEXT,
    },

    agama_ibu: {
      type: DataTypes.TEXT,
    },

    pekerjaan_ibu: {
      type: DataTypes.TEXT,
    },

    noHp_ibu: {
      type: DataTypes.TEXT,
    },

    notlp_ibu: {
      type: DataTypes.TEXT,
    },

    email_ibu: {
      type: DataTypes.TEXT,
    },

    //ortu = ayah

    provinsi_ortu: {
      type: DataTypes.TEXT,
    },

    kota_ortu: {
      type: DataTypes.TEXT,
    },

    kecamatan_ortu: {
      type: DataTypes.TEXT,
    },

    kelurahan_ortu: {
      type: DataTypes.TEXT,
    },

    desa_ortu: {
      type: DataTypes.TEXT,
    },

    namaJalan_ortu: {
      type: DataTypes.TEXT,
    },

    // ibu = ibu
    provinsi_ibu: {
      type: DataTypes.TEXT,
    },

    kota_ibu: {
      type: DataTypes.TEXT,
    },

    kecamatan_ibu: {
      type: DataTypes.TEXT,
    },

    kelurahan_ibu: {
      type: DataTypes.TEXT,
    },

    desa_ibu: {
      type: DataTypes.TEXT,
    },

    namaJalan_ibu: {
      type: DataTypes.TEXT,
    },

    //wali data
    nama_wali: {
      type: DataTypes.TEXT,
    },

    hubkeluarga_wali: {
      type: DataTypes.TEXT,
    },

    tempLahir_wali: {
      type: DataTypes.TEXT,
    },

    tglLahir_wali: {
      type: DataTypes.TEXT,
    },

    agama_wali: {
      type: DataTypes.TEXT,
    },

    jeniskelamin_wali: {
      type: DataTypes.TEXT,
    },

    pekerjaan_wali: {
      type: DataTypes.TEXT,
    },

    noHp_wali: {
      type: DataTypes.TEXT,
    },

    notlp_wali: {
      type: DataTypes.TEXT,
    },

    email_wali: {
      type: DataTypes.TEXT,
    },

    provinsi_wali: {
      type: DataTypes.TEXT,
    },

    kota_wali: {
      type: DataTypes.TEXT,
    },

    kecamatan_wali: {
      type: DataTypes.TEXT,
    },

    kelurahan_wali: {
      type: DataTypes.TEXT,
    },

    desa_wali: {
      type: DataTypes.TEXT,
    },

    namaJalan_wali: {
      type: DataTypes.TEXT,
    },

    //prestasi nya

    username: {
      type: DataTypes.TEXT,
    },
    password: {
      type: DataTypes.TEXT,
    },
    role: {
      type: DataTypes.TEXT,
      defaultValue: "Pelatih",
    },
    Pass: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

Cabor.hasMany(Pelatih);
Pelatih.belongsTo(Cabor, {foreignKey : "id_cabor"});
Pelatih.hasMany(Pelatih)
Pelatih.belongsTo(Admin, {foreignKey : "id_admin"})

export default Pelatih;
