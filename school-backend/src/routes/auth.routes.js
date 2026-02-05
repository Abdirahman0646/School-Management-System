const express = require('express');
const passport = require('passport');
const { oauthSuccess, me } = require('../controllers/auth.controller');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/' }),
  oauthSuccess
);

router.get('/me', authenticate, me);

module.exports = router;
