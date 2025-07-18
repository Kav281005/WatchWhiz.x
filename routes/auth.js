// const router = require('express').Router();

// const passport = require('passport');

// router.post('/register', async (req, res) => {
  //   try {
    //     const user = await User.register(new User(req.body), req.body.password);
    //     req.login(user, err => {
      //       if (err) return res.status(500).json({ error: err });
      //       return res.json({ success: true, user: { username: user.username } });
      //     });
      //   } catch (err) {
        //     res.status(400).json({ error: err.message });
        //   }
        // });
        
        // router.post('/login', passport.authenticate('local'), (req, res) => {
          //   res.json({ success: true, user: { username: req.user.username } });
          // });
          
          // router.get('/logout', (req, res) => {
            //   req.logout(() => res.json({ success: true }));
            // });
            
            // module.exports = router;
const express = require('express')
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

router.post('/register', async (req, res) => {
try {
    // Check if user exists
    const existing = await User.findOne({ email: req.body.email});
    if (existing) return res.status(400).json({ error: 'User already exists' });

    // Create new user
    const user = new User({ username: req.body.username, email: req.body.email, fullname: req.body.fullname });
    await User.register(user, req.body.password);
    req.login(user, err => {
      if (err) return res.status(500).json({ error: err.message });
      return res.json({ success: true, user: { username: user.username } });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
})
router.post('/login',
  passport.authenticate('local'),
  (req, res) => {
    res.status(200).json({ success: true, user: { username: req.user.username } });
  }
);

router.get('/logout', (req, res) => {
  req.logout(err => err ? res.status(500) : res.json({ success: true }));
});
module.exports = router;