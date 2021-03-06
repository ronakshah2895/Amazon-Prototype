const express = require('express');
const kafka = require('../kafka');

const app = express();

app.get('/', (...args) => kafka.sendMessage('operations', { route: 'getOrder' }, args));
app.post('/', (...args) => kafka.sendMessage('operations', { route: 'postOrder' }, args));
app.put('/', (...args) => kafka.sendMessage('operations', { route: 'putOrder' }, args));

module.exports = app;
