const express = require('express');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const session = require('express-session');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // React app's URL
  credentials: true
}));
app.use(session({ secret: '9d90495cbea64ab8dba078e936104f70afc0093d844969a278db6371d0ee244b8e6b00a1cb4704db29b6c6a0df495565571d60f707c1c68fd27d136b05ec6831', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GitHubStrategy({
  clientID: 'Ov23liyYccrTbLkusRCU',
  clientSecret: '6f7f9a0ba285ec311a0c714e3b402cd455bf3d97',
  callbackURL: 'http://localhost:5000/auth/github/callback'
},
function(accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: 'http://localhost:5173/login' }),
  function(req, res) {
    res.redirect('http://localhost:5173/profile');
  });

app.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    console.log(req.user);
    res.json(req.user);
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

app.listen(5000, () => {
  console.log('Backend server is running on http://localhost:5000');
});
