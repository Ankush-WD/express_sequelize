'use strict';

const { Sequelize } = require("sequelize");
const { DB_HOST_NAME, DB_NAME, DB_USERNAME, DB_PASSWORD, DB_TYPE } = require( '../config/index.js');


const sequelize= new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD,{
    host:DB_HOST_NAME,
    dialect:DB_TYPE
});

try{
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
}catch(error){
    console.error('Unable to connect to the database:', error);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./userModel.js")(sequelize, Sequelize);


module.exports = db;