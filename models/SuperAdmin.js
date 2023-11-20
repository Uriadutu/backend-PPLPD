import db from "../config/Database.js";
import { Sequelize } from "sequelize";

const {DataTypes} = Sequelize;
const SuperAdmin = db.define("SuperAdmin", {
  id_Super: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  nama : {
    type : DataTypes.STRING
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "SuperAdmin",
  },
}, {
    freezeTableName : true
});

export default SuperAdmin;