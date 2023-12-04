import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Atlet from "./Atletmodels.js";
import ForumCabor from "./ForumCaborModels.js";
import Pelatih from "./Pelatihmodels.js";

const { DataTypes } = Sequelize;
const Komentar = db.define(
  "Komentar",
  {
    id_komen: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_forumCabor: {
      type: DataTypes.INTEGER,
    },
    isi_komen: {
      type: DataTypes.STRING,
      allowNull: false,
      type: DataTypes.TEXT,
      validate: {
        notEmpty : true,
        checkTextLength(value) {
          if (value.length > 50000) {
            throw new Error("Panjang pesan melebihi batas maksimum");
          }
        },
      },
    },
    id_atlet: {
      type: DataTypes.STRING,
    },
    id_pelatih: {
      type: DataTypes.STRING,
    },
    uuid_penulis: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

Atlet.hasMany(Komentar);
Komentar.belongsTo(Atlet, { foreignKey : "id_atlet" });
ForumCabor.hasMany(Komentar);
Komentar.belongsTo(ForumCabor, { foreignKey : "id_forumCabor" });
Pelatih.hasMany(Komentar);
Komentar.belongsTo(Pelatih, { foreignKey : "id_pelatih" });
export default Komentar