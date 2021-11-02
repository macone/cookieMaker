const express = require('express');
const { COOKIE_BASES, COOKIE_ADDONS } = require('../data/cookie-data');

const homeRouter = express.Router();

homeRouter
  .get('/', (req, res) => {
    res.render('home/index.hbs', {
      cookie: {
        base: 'light',
        addons: ['coconut', 'honey'],
      },
      bases: Object.entries(COOKIE_BASES), // Tutaj zmieniamy to w tablice dwuwymiarowa zeby nie uzywac kluczy lecz samego indeksu
      addons: Object.entries(COOKIE_ADDONS),
      // @TODO: Potrzebujemy wiedzieć jakie są ceny wybranych baz i dodatków

    });
  });

module.exports = {
  homeRouter,
};
