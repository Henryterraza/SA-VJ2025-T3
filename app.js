const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const ciRoutes = require('./routes/ciRoutes');

const app = express();
app.use(bodyParser.json());
app.use('/cis', ciRoutes);

const PORT = process.env.PORT || 3000;
sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});