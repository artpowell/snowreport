const express = require('express');
const snowreport = require('../routes/snowreports');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/snowreport', snowreport);
  app.use(error);
}