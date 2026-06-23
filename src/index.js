require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('./auth/passport');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'web')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'web', 'index.html'));
});

app.get('/auth/discord', passport.authenticate('discord'));

app.get('/auth/discord/callback',
  passport.authenticate('discord', { failureRedirect: '/' }),
  (req, res) => res.redirect('/dashboard')
);

app.get('/dashboard', checkAuth, (req, res) => {
  const guilds = req.user.guilds || [];
  let html = `<h1>Welcome ${req.user.username}</h1><h2>Your Servers</h2>`;
  guilds.forEach(g => {
    html += `<div><p>${g.name}</p><a href="/guild/${g.id}">Manage</a></div>`;
  });
  res.send(html);
});

app.get('/guild/:id', checkAuth, (req, res) => {
  res.send(`<h1>Manage Guild ${req.params.id}</h1>
  <form method="POST" action="/guild/${req.params.id}/settings">
    <input name="roleId" placeholder="Verification Role ID" />
    <button type="submit">Save</button>
  </form>`);
});

app.post('/guild/:id/settings', checkAuth, (req, res) => {
  res.redirect('/guild/' + req.params.id);
});

app.get('/privacy', (req, res) => {
  res.sendFile(path.join(__dirname, 'web', 'privacy.html'));
});

app.get('/terms', (req, res) => {
  res.sendFile(path.join(__dirname, 'web', 'terms.html'));
});

app.get('/logout', (req, res) => {
  req.logout(() => res.redirect('/'));
});

app.listen(PORT, () => console.log(`Dashboard running on ${PORT}`));
