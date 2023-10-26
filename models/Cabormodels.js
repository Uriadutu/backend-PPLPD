import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Cabor = db.define (
    "Cabor", {
        id_cabor : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            allowNull : true,
            validate : {
                notEmpty : false,
            }
        },
        namaCabor : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true,
            }
        },
        kodeCabor : {
            type : DataTypes.INTEGER,
            allowNull : true,
            validate : {
                len : [2, 2],
                notEmpty : false,
            }
        }

    }, {
        freezeTableName: true,
    }
);

export default Cabor;