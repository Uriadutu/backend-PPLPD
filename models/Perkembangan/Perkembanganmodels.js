import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import Indikator from "./IndikatorModels.js";
import Atlet from "../Atletmodels.js";

const {DataTypes} = Sequelize;

const Perkembangan = db.define(
  "Perkembangan",
  {
    id_perkem: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_atlet: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    id_indikator: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    tgl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    hasilTes: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    datahapus : {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    }
  },
  {
    freezeTableName: true,
  }
);

Indikator.hasMany(Perkembangan);
Perkembangan.belongsTo(Indikator, {foreignKey : "id_indikator"});
Atlet.hasMany(Perkembangan);
Perkembangan.belongsTo(Atlet, {foreignKey : "id_atlet"});
export default Perkembangan;