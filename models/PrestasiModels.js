import { Sequelize } from "sequelize"
import db from "../config/Database.js"
import Atlet from "../models/Atletmodels.js"

const {DataTypes} = Sequelize;

const Prestasi= db.define("Prestasi", {
    id_prestasi : { 
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true

    },
    id_atlet : DataTypes.STRING,
    nama_prestasi : DataTypes.STRING,

}, {
    freezeTableName : true,
})

Atlet.hasMany(Prestasi)
Prestasi.belongsTo(Atlet, {foreignKey : "id_atlet"})

export default Prestasi