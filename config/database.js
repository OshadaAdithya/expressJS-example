/*const { Sequelize } = require('sequelize');
const config = require('../config/config.json')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(config.database, config.username, config.password, config.database, config.host, config.dialect);
// ... rest of the configuration

module.exports = sequelize;*/



/*const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username:'root',
  password:'',
  database:'expressjs'
});

module.exports = sequelize;*/

/*const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('expressjs', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // Disable logging SQL queries
});

module.exports = sequelize;*/

/*module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "expressjs",
  dialect: "mysql",
  
};*/
