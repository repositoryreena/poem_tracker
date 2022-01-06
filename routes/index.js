const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', function(req, res, next) {
  res.redirect('/poems');
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/poems',
    failureRedirect : '/poems'
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/poems');
});

// router.delete('/poems/:idx', function(req, res) {
//   console.log("trying delete0")
//   poems.splice(req.params.idx, 1)
//   console.log(req.params);
//   res.redirect('/')
// })

module.exports = router;