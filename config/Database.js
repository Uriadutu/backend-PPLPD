import {Sequelize} from "sequelize";

const db = new Sequelize('pplpd', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;