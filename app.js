// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// const expressSession = require('express-session')
// const mongoose = require('mongoose');
// const flash=require("connect-flash")
// const cors = require("cors");
// var app = express();
// const authRoutes = require('./routes/auth');
// mongoose.connect('mongodb://127.0.0.1:27017/WatchWhiz_x')
//   .then(() => console.log('✅ MongoDB connected to WatchWhiz_x'))
//   .catch(err => console.error('❌ MongoDB connection error:', err));

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, '0.0.0.0', () =>
//   console.log(`✅ Server listening on port ${PORT}`)
// );


// var indexRouter = require('./routes/index');
// const userModel = require('./models/User');

// const passport=require('passport')
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/watchlist', require('./routes/watchlist'));

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// app.use(
//   cors({
//     origin: 'http://localhost:5173', // frontend origin
//     credentials: true,
//   })
// );

// app.use(flash());
// app.use(expressSession({
//     resave:false,
//     saveUninitialized:false,
//     secret:"hey hey hey"
// }))
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(userModel.createStrategy());
// passport.serializeUser(userModel.serializeUser());
// passport.deserializeUser(userModel.deserializeUser());

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// // app.use('/User', userModel);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
// // const res = await fetch('/api/auth/register', { … });
// // if (!res.ok) {
// //   const text = await res.text();
// //   console.error('API Error:', res.status, text);
// //   throw new Error(text);
// // }
// // const data = await res.json();


// module.exports = app;

// ✅ Clean and Converted app.js for WatchWhiz_x

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const flash = require('connect-flash');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
//const axios = require('axios'); 

const app = express();

// ✅ Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/WatchWhiz_x')
  .then(() => console.log('✅ MongoDB connected to WatchWhiz_x'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(flash());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// ✅ Session and Passport
app.use(session({
  secret: 'hey hey hey',
  resave: false,
  saveUninitialized: false
}));

const userModel = require('./models/User');
app.use(passport.initialize());
app.use(passport.session());
passport.use(userModel.createStrategy());
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

// ✅ Set up EJS if needed (optional views)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ✅ Routes
const indexRouter = require('./routes/index');
const authRoutes = require('./routes/auth');
const watchlistRoutes = require('./routes/watchlist');
//const isLoggedIn = require('./middleware/isLoggedIn');

// Public route
app.use('/api/auth', authRoutes);
// app.use('/api/auth', require('./routes/auth'));

// Protected route
const isLoggedIn = require('./middleware/isLoggedIn');


// Optional root
app.use('/', indexRouter);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Server Error'
  });
});
// axios.post('/api/auth/register', { username, password, email, fullname }, {
//   withCredentials: true
// });

// ✅ Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server listening on port ${PORT}`);
});

module.exports = app;
