'use strict';

const express = require('express');
const router = express.Router();
const { instrumentInterface } = require('../models');
const validator = require('../middleware/validator');

router.post('/instruments', validator, async (req, res, send) => {
  console.log('req body', req.body);
  const newInstrument = await instrumentInterface.create(req.body);
  res.status(200).send(newInstrument);
});

router.get('/instruments', async (req, res, next) => {
  try {
    let instruments = await instrumentInterface.read();
    res.status(200).send(instruments);

  } catch(err) {
    next(err);
  }
});

router.get('/instruments/:id', async (req, res, next) => {
  try {
    let { id } = req.params;

    let instrument = await instrumentInterface.read(id);
    res.status(200).send(instrument);

  } catch(err) {
    next(err);
  }
});

router.put('/instruments/:id', async (req, res, next) => {
  try {
    let { id } = req.params;

    let instrument = await instrumentInterface.update(req.body, id);
    res.status(200).send(instrument);

  } catch(err) {
    next(err);
  }
});

router.delete('/instruments/:id', async (req, res, next) => {
  try {
    let { id } = req.params;

    let response = await instrumentInterface.delete(id);
    res.status(200).send(response);

  } catch(err) {
    next(err);
  }
});


module.exports = router;
