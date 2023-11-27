import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Atlet from "./Atletmodels.js";

const {DataTypes} = Sequelize;

const Prestasi = db.define("Prestasi", {
    id_prestasi : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
    },
    id_atlet : {
        type : DataTypes.STRING,
    },
    namaClub : {
        type : DataTypes.STRING,
    },
    namaEvent : {
        type : DataTypes.STRING,
    },
    tahunPrestasi : {
        type : DataTypes.STRING,
    },
    Pencapaian : {
        type : DataTypes.STRING,
    }
}, {
    freezeTableName : true,
})

Atlet.hasMany(Prestasi),
Prestasi.belongsTo(Atlet, {foreignKey :"id_atlet"});

export default Prestasi;
