import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import Cabor from "../Cabormodels.js";


const {DataTypes} = Sequelize;

const Komponen = db.define(
  "Komponen",
  {
    id_komponen: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_cabor: {
      type: DataTypes.INTEGER,
    },
    namaKomponen: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    periode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Cabor.hasMany(Komponen);
Komponen.belongsTo(Cabor, {foreignKey : "id_cabor"});

export default Komponen;