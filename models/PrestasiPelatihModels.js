import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Pelatih from "../models/PelatihModels.js";

const { DataTypes } = Sequelize;

const Prestasi_pelatih = db.define(
  "Prestasi_pelatih",
  {
    id_prestasi_pelatih: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_pelatih: {
      type: DataTypes.STRING,
    },
    namaClub: {
      type: DataTypes.STRING,
    },
    Tingkat: {
      type: DataTypes.STRING,
    },
    namaEvent: {
      type: DataTypes.STRING,
    },
    tahunPrestasi: {
      type: DataTypes.STRING,
    },
    Pencapaian: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

Pelatih.hasMany(Prestasi_pelatih), 
Prestasi_pelatih.belongsTo(Pelatih, { foreignKey: "id_pelatih" });

export default Prestasi_pelatih;
