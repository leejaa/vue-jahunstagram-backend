const express = require('express');
const passport = require('passport');
const crypto = require('crypto');
const db = require('../models');
const { isLoggedIn } = require('./middleware');

const router = express.Router();

router.get('/', async(req, res) => { // /api/users/

  console.log('api/users enter...');

const users = await db.User.findAll();

  return res.json(users);
});

module.exports = router;
