var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var router = express.Router();


const usuarios = require('../dbops/mongops');

/* GET users listing. */


module.exports = router
