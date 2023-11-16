import { Sequelize } from "sequelize";
import db from "../config/Database.js";


const {DataTypes} = Sequelize;

const Panduan = db.define("Panduan", {
    id_panduan : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement: true
    },
    nama : DataTypes.STRING,
    file : {
        type : DataTypes.STRING,

    },
    url : DataTypes.STRING,
    
    format : DataTypes.STRING,
}, {
    freezeTableName : true,
}
)

export default Panduan;