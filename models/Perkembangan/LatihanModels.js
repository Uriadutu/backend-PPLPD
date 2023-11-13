import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import Cabor from "../Cabormodels.js";
import Indikator from "./IndikatorModels.js";

const {DataTypes} = Sequelize;

const Latihan = db.define( "Latihan", {

    id_latihan : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
    },
    id_cabor : DataTypes.INTEGER,

    id_indikator : DataTypes.INTEGER,

    namaLatihan : {
    type : DataTypes.STRING,
    allowNull : false,
    validate : {
        notEmpty : true,
    }

    },

}, {freezeTableName : true});

Cabor.hasMany(Latihan);
Latihan.belongsTo(Cabor, {foreignKey : "id_cabor"});

Indikator.hasMany(Latihan);
Latihan.belongsTo(Indikator, {foreignKey : "id_indikator"});

export default Latihan;