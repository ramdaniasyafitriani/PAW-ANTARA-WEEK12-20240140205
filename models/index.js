const sequelize = require('../config/database');
const User = require('./user.model');
const Product = require('./product.model');
const Review = require('./review.model');

module.exports = { sequelize, User, Product, Review };