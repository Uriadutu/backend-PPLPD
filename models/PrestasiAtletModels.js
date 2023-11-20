import db from "../config/Database.js";
import { Sequelize } from "sequelize";


const {DataTypes} = Sequelize;
const PrestasiAtlet = db.define("PrestasiAtlet", {
    id_PAtlet : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement :true,
    },
    nama_club : DataTypes.STRING,
    nama_event : DataTypes.STRING,
    Tahun : DataTypes.STRING,
    Pencapaian : DataTypes.STRING,
}, {freezeTableName : true,})

export default  PrestasiAtlet;