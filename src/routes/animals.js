'use strict';

const express = require('express');
const router = express.Router();
const { animalInterface } = require('../models');
const validator = require('../middleware/validator');

router.post('/animals', validator, async (req, res, send) => {
  console.log('req body', req.body);

  const newAnimal = await animalInterface.create(req.body);
  res.status(200).send(newAnimal);
});

router.get('/animals', async (req, res, next) => {
  try{
    let animals = await animalInterface.read();
    res.status(200).send(animals);

  } catch(err){
    next(err);
  }
});

router.get('/animals/:id', async (req, res, next) => {
  try {
    let { id } = req.params;

    let animal = await animalInterface.read(id);
    res.status(200).send(animal);

  } catch(err) {
    next(err);
  }
});

router.put('/animals/:id', async (req, res, next) => {
  try {
    let { id } = req.params;

    let animal = await animalInterface.update(req.body, id);
    res.status(200).send(animal);

  } catch(err) {
    next(err);
  }
});

router.delete('/animals/:id', async (req, res, next) => {
  try{
    let { id } = req.params;

    let response = await animalInterface.delete(id);
    res.status(200).send(response);

  } catch(err) {
    next(err);
  }
});


module.exports = router;
