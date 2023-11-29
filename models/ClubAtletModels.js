import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Atlet from "./Atletmodels.js";
import Club from "./ClubModels.js";

const {DataTypes} =  Sequelize;
const ClubAtlet = db.define("club_atlet", {
    id_clubatlet : {
        type : DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement : true,
    },
    id_atlet : {
        type : DataTypes.STRING,
    },
    id_club : {
        type : DataTypes.INTEGER
    },
}, {
    freezeTableName : true
})

Atlet.hasMany(ClubAtlet);
ClubAtlet.belongsTo(Atlet, {foreignKey : "id_atlet"});
Club.hasMany(ClubAtlet);
ClubAtlet.belongsTo(Club, {foreignKey : "id_club"});
export default ClubAtlet