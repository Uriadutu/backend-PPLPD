import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Atlet from "./Atletmodels.js";
import Cabor from "./Cabormodels.js";

const {DataTypes} =  Sequelize;
const Club = db.define("Club", {
    id_club : {
        type : DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement : true,
    },
    nama_club : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            notEmpty : true
        }
    },
    id_cabor : {
        type : DataTypes.INTEGER
    }
}, {
    freezeTableName : true,
}
);
Cabor.hasMany(Club);
Club.belongsTo(Cabor, {foreignKey : "id_cabor"});


export default Club;