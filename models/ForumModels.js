import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes}= Sequelize;

const Forum = db.define("Forum", {
    id_forum : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    namaForum : DataTypes.STRING,
}, {
    freezeTableName : true,
})

export default Forum;