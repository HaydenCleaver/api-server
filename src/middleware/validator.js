'use strict';

module.exports = (req, res, next) => {
  let { name } = req.body;
  if(name){
    next();
  } else {
    next('Name property was not defined');
  }
};
