import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

const {DataTypes} = Sequelize;

const Indikator = db.define("Indikator", {
    id_indikator : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
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

export default Indikator;