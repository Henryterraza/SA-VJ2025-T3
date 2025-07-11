// server.js
const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 8000;

sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
