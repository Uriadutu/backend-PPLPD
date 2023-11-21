import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Admin from "./Adminmodels.js";
import Pelatih from "./Pelatihmodels.js";
import SuperAdmin from "./SuperAdmin.js";
import Forum from "./ForumModels.js";

const { DataTypes } = Sequelize;

const IsiForum = db.define("IsiForum", {
  id_isiforum: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_forum : DataTypes.INTEGER,
  id_admin: DataTypes.STRING,
  id_pelatih: DataTypes.STRING,
  id_Super: DataTypes.STRING,
  pesan : {
    type : DataTypes.TEXT,
     validate: {
      checkTextLength(value) {
        if (value.length > 30000) { 
          throw new Error('Panjang pesan melebihi batas maksimum');
        }
      },
    },
  },
  File: DataTypes.STRING,
  url: DataTypes.STRING,
  jam: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },

}, {
    freezeTableName : true,
});
Admin.hasMany(IsiForum);
IsiForum.belongsTo(Admin, {foreignKey :"id_admin"});
Pelatih.hasMany(IsiForum);
IsiForum.belongsTo(Pelatih, {foreignKey :"id_pelatih"});
SuperAdmin.hasMany(IsiForum);
IsiForum.belongsTo(SuperAdmin, {foreignKey :"id_Super"});
Forum.hasMany(IsiForum);
IsiForum.belongsTo(Forum, {foreignKey :"id_forum"});

export default IsiForum;

