const { sequelize, CiType, Environment, SecurityLevel, ComplianceLevel } = require('./models');

async function waitForDb(retries = 10, delayMs = 3000) {
  for (let i = 1; i <= retries; i++) {
    try {
      console.log(`Intentando conectar a la base de datos (intento ${i} de ${retries})...`);
      await sequelize.authenticate();
      console.log('Conexión a la base de datos establecida.');
      return;
    } catch (err) {
      console.log(`No se pudo conectar a la base de datos: ${err.message}`);
      if (i === retries) {
        console.error('Límite de reintentos alcanzado. Abortando seed.');
        process.exit(1);
      }
      await new Promise(res => setTimeout(res, delayMs));
    }
  }
}

async function seed() {
  try {
    await waitForDb();

    console.log('Sincronizando base de datos (force: true)...');
    await sequelize.sync({ force: true });

    console.log('Insertando datos iniciales...');

    await CiType.bulkCreate([
      { name: 'Hardware' },
      { name: 'Software' },
      { name: 'Base de Datos' },
      { name: 'Aplicación' }
    ]);

    await Environment.bulkCreate([
      { name: 'DEV' },
      { name: 'QA' },
      { name: 'PROD' }
    ]);

    await SecurityLevel.bulkCreate([
      { level: 'Alto' },
      { level: 'Medio' },
      { level: 'Bajo' }
    ]);

    await ComplianceLevel.bulkCreate([
      { level: 'Cumple' },
      { level: 'No cumple' }
    ]);

    console.log('Seed completado!');
    process.exit(0);
  } catch (error) {
    console.error('Error en seed:', error);
    process.exit(1);
  }
}

seed();
