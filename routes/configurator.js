const express = require('express');

const configuratorRouter = express.Router();
configuratorRouter
  .get('/select-base/:baseName', (req, res) => {
    const { baseName } = req.params;
    res
      .cookie('cookieBase', baseName)
      .render('configurator/base-selected.hbs', {
        baseName,
      });
  });
module.exports = {
  configuratorRouter,
};
