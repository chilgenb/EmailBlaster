//additional items:
//ran npm install @types/node --save-dev

const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/user');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

// app.use - middleware - handle items before sending to route handlers
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

// setup parameters for session
app.use(passport.initialize());
// start session
app.use(passport.session());

// shorthand for const routes = require('./routes/authRoutes'); routes.
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);