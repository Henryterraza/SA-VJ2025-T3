// app.js
const express = require('express');
const bodyParser = require('body-parser');
const ciRoutes = require('./routes/ciRoutes');

const app = express();
app.use(bodyParser.json());
app.use('/cis', ciRoutes);

module.exports = app;
