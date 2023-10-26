import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const AtletCabor = db.define("atletCabor", {
  id_atlet_cabor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Ini akan membuat nilai otomatis bertambah saat Anda menyisipkan data baru.
  },
  id_atlet: {
    type: DataTypes.STRING,
    references: {
      model: "atlet",
      key: "id_atlet",
    },
  },
  id_cabor: {
    type: DataTypes.INTEGER,
    references: {
      model: "cabor",
      key: "id_cabor",
    },
  },
});

// Pastikan model ini telah dikonfigurasi dengan benar sesuai dengan database Anda

export default AtletCabor;
