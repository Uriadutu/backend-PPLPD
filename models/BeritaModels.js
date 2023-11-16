import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Berita = db.define("Berita", {
    judul : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            len : [1, 200],
            notEmpty : true,
        }
    },
    isiBerita : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            notEmpty : true,
            len : [5, 700],
        }
    },


}, {
    freezeTableName : true,
});

export default Berita;