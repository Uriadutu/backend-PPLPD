import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Cabor from "./Cabormodels.js";

const {DataTypes} = Sequelize;
const Program = db.define("Program",{
    id_program : {
        type : DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_cabor : DataTypes.INTEGER,
    nama_Program : {
        type: DataTypes.STRING,
        allowNull : false,
        validate : {
            notEmpty  :true,
        }
    },
    File : DataTypes.STRING,
    url : DataTypes.STRING,

}, {
    freezeTableName: true,
});

Cabor.hasMany(Program);
Program.belongsTo(Cabor, {foreignKey : "id_cabor"});

export default Program;
