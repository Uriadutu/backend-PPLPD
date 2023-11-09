import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Gambar = db.define("Gambar", {
  id_gambar: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  image: {
    type: DataTypes.STRING,
  },
  url: DataTypes.STRING,
}, {
    freezeTableName : true,
});

export default Gambar