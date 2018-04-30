const {SnowReport, validate} = require('../models/snowreport'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const moment = require('moment');

router.get('/', async (req, res) => {

  var today = moment().startOf('day');
  var tomorrow = today.clone().add(1, 'days');
  
  // Only return reports for today
  const snowReports = await SnowReport.find({
      reportDate: {
          $gte: today.toDate(),
          $lt: tomorrow.toDate()
      }
  }).sort('name');
  res.send(snowReports);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let snowReport = new SnowReport({ 
    reportDate: req.body.reportDate,
    state: req.body.state,
    resort: req.body.resort,
    baseSnowTtl: req.body.baseSnowTtl,
    newSnowTtl: req.body.newSnowTtl,
    snowCondition: req.body.snowCondition
  });
  snowReport = await snowReport.save();
  
  res.send(snowReport);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const snowReport = await SnowReport.findByIdAndUpdate(req.params.id,
    { 
        reportDate: req.body.reportDate,
        state: req.body.state,
        resort: req.body.resort,
        baseSnowTtl: req.body.baseSnowTtl,
        newSnowTtl: req.body.newSnowTtl,
        snowCondition: req.body.snowCondition
    }, { new: true });

  if (!snowReport) return res.status(404).send('The Snow Report with the given ID was not found.');
  
  res.send(snowReport);
});

router.delete('/:id', async (req, res) => {
  const snowReport = await SnowReport.findByIdAndRemove(req.params.id);

  if (!snowReport) return res.status(404).send('The Snow Report with the given ID was not found.');

  res.send(snowReport);
});

router.get('/:id', async (req, res) => {
  const snowReport = await SnowReport.findById(req.params.id);

  if (!snowReport) return res.status(404).send('The customer with the given ID was not found.');

  res.send(snowReport);
});

module.exports = router; 