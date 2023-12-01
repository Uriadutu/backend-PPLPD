import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Pelatih from "./Pelatihmodels.js";

const { DataTypes } = Sequelize;

const LisensiPelatih = db.define("Lisensi", {
    id_Lisensi : {
        type : DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement : true,
    },
    id_pelatih : {
        type : DataTypes.STRING,
    },
    nama : DataTypes.STRING,
    file : DataTypes.STRING,
    url : DataTypes.STRING,

}, {
    freezeTableName : true,
})
Pelatih.hasMany(LisensiPelatih)
LisensiPelatih.belongsTo(Pelatih, {foreignKey : "id_pelatih"})

export default LisensiPelatih;