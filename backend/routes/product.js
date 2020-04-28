const express = require('express');
const passport = require('passport'); //WILL BE REQUIRED LATER
const { getProducts, addProduct } = require('../actions/product');

const app = express();

app.post('/', addProduct);
app.get('/getProducts', getProducts);

module.exports = app;
