const express = require('express');
const { getCookieSettings } = require('../utils/get-cookie-settings');

const orderRouter = express.Router();

orderRouter
  .get('/summary', (req, res) => {
    const {
      base, addons, sum, allAddons, allBases,
    } = getCookieSettings(req);
    res.render('order/summary', {
      cookie: {
        base,
        addons,
      },
      allBases,
      allAddons,
      sum,
    });
  })

  .get('/thanks', ((req, res) => {
    const { sum, addons, cookieBase } = getCookieSettings(req);
    res
      .clearCookie('cookieBase')
      .clearCookie('cookieAddons')
      .render('order/thanks', {
        cookieBase,
        addons,
        sum,
      });
  }));

module.exports = {
  orderRouter,
};
