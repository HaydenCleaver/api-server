'use strict';

module.exports = (req, res, next) => {
  console.log(`Request: ${req.method}, ${req.originalUrl}`);
  next();
};
