import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Atlet from "./Atletmodels.js";
import Pelatih from "./Pelatihmodels.js";
import Cabor from "./Cabormodels.js";

const { DataTypes } = Sequelize;
const ForumCabor = db.define(
  "ForumCabor",
  {
    id_ForumCabor: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_cabor: DataTypes.INTEGER,
    id_pelatih: DataTypes.STRING,
    id_atlet: DataTypes.STRING,
    judul_forum: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    isi_forum: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        checkTextLength(value) {
          if (value.length > 50000) {
            throw new Error("Panjang pesan melebihi batas maksimum");
          }
        },
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Atlet.hasMany(ForumCabor);
ForumCabor.belongsTo(Atlet, { foreignKey: "id_atlet" });
Pelatih.hasMany(ForumCabor);
ForumCabor.belongsTo(Pelatih, { foreignKey: "id_pelatih" });
Cabor.hasMany(ForumCabor);
ForumCabor.belongsTo(Cabor, { foreignKey: "id_cabor" });

export default ForumCabor;
