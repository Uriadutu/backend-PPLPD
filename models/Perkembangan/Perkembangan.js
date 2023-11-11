import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import Indikator from "./Indikator.js";
import Cabor from "../Cabormodels.js";
import Komponen from "./KomponenModels.js";

const {DataTypes} = Sequelize;

const Perkembangan = db.define("Perkembangan", {
    id_perkem : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,

    },
    id_cabor : {
        type : DataTypes.INTEGER
    },
    id_atlet : {
        type : DataTypes.STRING,
    },
    id_komponen : DataTypes.INTEGER,
    id_indikator : DataTypes.INTEGER,
    tgl : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            notEmpty : true,
        }
    },
    hasilTes : {
        type : DataTypes.STRING,
    }

}, {
    freezeTableName : true,
});

Indikator.hasMany(Perkembangan);
Perkembangan.belongsTo(Indikator, {foreignKey : "id_indikator"});
Cabor.hasMany(Perkembangan);
Perkembangan.belongsTo(Cabor, {foreignKey : "id_cabor"});
Komponen.hasMany(Perkembangan);
Perkembangan.belongsTo(Komponen, {foreignKey : "id_komponen"});

export default Perkembangan;