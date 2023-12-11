import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Cabor from "./Cabormodels.js";
import Admin from "./Adminmodels.js";

const { DataTypes } = Sequelize;

const Atlet = db.define(
  "Atlet",
  {
    id_atlet: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "aktif",
    },
    club: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
    },
    No_daftar: {
      type: DataTypes.STRING,
      defaultValue: "001",
    },

    // INI LAGI
    name_awal: {
      type: DataTypes.STRING,
    },
    nama_tengah: {
      type: DataTypes.STRING,
    },
    nama_akhir: {
      type: DataTypes.STRING,
    },

    nama_panggil: {
      type: DataTypes.STRING,
    },
    tgl_lahir: {
      type: DataTypes.STRING,
    },
    tmp_lahir: {
      type: DataTypes.STRING,
    },

    agama: {
      type: DataTypes.STRING,
    },

    nama_jalan: {
      type: DataTypes.STRING,
    },

    desa: {
      type: DataTypes.STRING,
    },

    kelurahan: {
      type: DataTypes.STRING,
    },

    kecamatan: {
      type: DataTypes.STRING,
    },

    kota: {
      type: DataTypes.STRING,
    },

    provinsi: {
      type: DataTypes.STRING,
    },

    no_telp: {
      type: DataTypes.STRING,
    },

    hp_mobile: {
      type: DataTypes.STRING,
    },

    email: {
      type: DataTypes.STRING,
    },

    kelamin: {
      type: DataTypes.STRING,
    },

    gol_darah: {
      type: DataTypes.STRING,
    },

    tinggi_badan: {
      type: DataTypes.STRING,
    },

    berat_badan: {
      type: DataTypes.STRING,
    },
    // pendidikan

    pendidikan: {
      type: DataTypes.STRING,
    },
    pend_terakhir: DataTypes.STRING,
    alumni: DataTypes.STRING,

    nama_sklh: {
      type: DataTypes.STRING,
    },
    alumni: DataTypes.STRING,

    tahun_lulus: DataTypes.STRING,

    ukuran_baju: {
      type: DataTypes.STRING,
    },

    ukuran_sepatu: {
      type: DataTypes.STRING,
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

    nama_club: {
      type: DataTypes.TEXT,
    },

    nama_event: {
      type: DataTypes.TEXT,
    },

    tahun_prestasi: {
      type: DataTypes.TEXT,
    },

    capai_prestasi: {
      type: DataTypes.TEXT,
    },

    username: {
      type: DataTypes.TEXT,
    },
    password: {
      type: DataTypes.TEXT,
    },
    role: {
      type: DataTypes.TEXT,
      defaultValue: "Atlet",
    },
    Pass: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

Cabor.hasMany(Atlet);
Atlet.belongsTo(Cabor, { foreignKey: "id_cabor" });
Admin.hasMany(Atlet);
Atlet.belongsTo(Admin, {foreignKey : "id_admin"})

export default Atlet;
