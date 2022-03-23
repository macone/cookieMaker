const express = require('express'); // pobieramy moduł express
const hbs = require('express-handlebars'); // pobieramy moduł handlebars
const cookieParser = require('cookie-parser');
// pobieramy moduł cookie parser

const { homeRouter } = require('./routes/home'); // pobieramy customowy moduł homeRouter czyli ścieżka strony głównej
const { configuratorRouter } = require('./routes/configurator'); // pobieramy customowy moduł configuratorRouter czyli ścieżka konfiguratora
const { orderRouter } = require('./routes/order'); // pobieramy customowy moduł orderRouter czyli ścieżka order/zamówienie
const { handlebarsHelpers } = require('./utils/handlebars-helpers');

const app = express(); // tworzymy nową aplikację express
app.use(express.json()); // aplikacja używa:

app.use(cookieParser()); // aplikacja używa: modułu odczytywania ciastek

app.engine('.hbs', hbs({
  extname: '.hbs',
  helpers: handlebarsHelpers,
})); // silnik aplikacji: handlebars

app.use('/configurator', configuratorRouter); // aplikacja używa: moduł configuratorRouter
app.use('/order', orderRouter); // aplikacja używa: moduł orderRouter
app.use('/', homeRouter); // aplikacja używa: scieżkowacza strony głównej
app.set('view engine', '.hbs'); // aplikacja ustaw: silnik widoków .hbs
app.use(express.static('public')); // aplikacja używa: folder statyczny public

app.listen(3000); // aplikacja nasłuchuje na porcie 3000

console.log('Program działa.');
