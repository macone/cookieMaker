const express = require('express');
const { getAddonsFromReq } = require('../utils/get-addons-from-req');
const { COOKIE_ADDONS, COOKIE_BASES } = require('../data/cookie-data');
const { renderError } = require('../utils/error-rendering');

const configuratorRouter = express.Router();

configuratorRouter
  .get('/select-base/:baseName', (req, res) => {
    const { baseName } = req.params;

    if (!COOKIE_BASES[baseName]) {
      renderError(res, 'Wybrałeś bazę, która nie istnieje!');
    } else {
      res
        .cookie('cookieBase', baseName)
        .render('configurator/base-selected.hbs', {
          baseName,
        });
    }
  })

  .get('/select-addon/:addonName', (req, res) => {
    const { addonName } = req.params;
    const addons = getAddonsFromReq(req);

    if (!COOKIE_ADDONS[addonName]) { // sprawdzanie czy taki dodatek już istnieje
      renderError(res, `Składnik ${addonName} został wybrany`);
    } else if (addons.includes(addonName)) { // sprawdzanie czy dodatek został już dodany
      renderError(res, `Składnik ${addonName} został już wybrany`);
    } else {
      addons.push(addonName);
      res
        .cookie('cookieAddons', JSON.stringify(addons))
        .render('configurator/add-ons.hbs', {
          addonName,
        });
    }
  })

  .get('/delete-addon/:addonName', (req, res) => {
    const { addonName } = req.params;
    const oldAddons = getAddonsFromReq(req);

    if (!oldAddons.includes(addonName)) {
      renderError(res, 'Próbujesz usunąć dodatek, który nie był dodany!');
    } else {
      const addons = getAddonsFromReq(req).filter((addon) => addon !== addonName);
      res
        .cookie('cookieAddons', JSON.stringify(addons))
        .render('configurator/deleted.hbs', {
          addonName,
        });
    }
  });

module.exports = {
  configuratorRouter,
};
