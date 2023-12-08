import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import Komponen from "./KomponenModels.js";
import Cabor from "../Cabormodels.js";

const {DataTypes} = Sequelize;

const Indikator = db.define("Indikator", {
    id_indikator : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
    },
    id_komponen : {
        type : DataTypes.STRING,
    },
    id_cabor : {
        type : DataTypes.INTEGER,
    },
    namaIndikator : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            notEmpty : true,
        }
    }
}, {
    freezeTableName : true,
});

Komponen.hasMany(Indikator);
Indikator.belongsTo(Komponen, {foreignKey : "id_komponen"});
Cabor.hasMany(Indikator);
Indikator.belongsTo(Cabor, {foreignKey : "id_cabor"});

export default Indikator;