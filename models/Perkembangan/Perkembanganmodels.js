import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import Indikator from "./IndikatorModels.js";
import Cabor from "../Cabormodels.js";
import Komponen from "./KomponenModels.js";
import Latihan from "./LatihanModels.js";

const {DataTypes} = Sequelize;

const Perkembangan = db.define("Perkembangan", {
    id_perkem : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
    },
    id_atlet : {
        type : DataTypes.STRING,
    },
    id_indikator : DataTypes.INTEGER,
    id_latihan : DataTypes.INTEGER,
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
Latihan.hasMany(Perkembangan);
Perkembangan.belongsTo(Latihan,  {foreignKey : "id_latihan"})

export default Perkembangan;