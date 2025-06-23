const { Sequelize } = require('sequelize');

if (process.env.NODE_ENV !== 'production') {
  try {
    const dotenv = require('dotenv');
    dotenv.config();
    console.log('.env cargado correctamente');
  } catch (err) {
    console.warn('No se pudo cargar .env o no está instalado. Usando process.env directamente.');
  }
}

const DB_NAME = process.env.DB_NAME || 'cmdb_test';
const DB_USER = process.env.DB_USER || 'admin';
const DB_PASSWORD = process.env.DB_PASSWORD || 'admin123';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 5432;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  logging: false, 
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error.message);
  }
}

testConnection();

module.exports = sequelize;
