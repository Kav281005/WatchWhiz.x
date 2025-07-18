const router = require('express').Router();
const User = require('../models/User');
const fetch = require('node-fetch');

function isLoggedIn(req, res, next) {
  req.isAuthenticated() ? next() : res.status(401).json({ error: 'Unauthorized' });
}

router.use(isLoggedIn);
router.get('/', async (req, res) => {
  try {
    const apiKey = process.env.RAPIDAPI_KEY;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'imdb236.p.rapidapi.com',
        'x-rapidapi-key':  '2e6ed66fcfmshcac286cede5c40ep16fe73jsn6a4e61d05318',
      }
    };

    const movieDetails = await Promise.all(
      req.user.watchlist.map(imdbID =>
        fetch(`https://imdb236.p.rapidapi.com/movie/details/?id=${imdbID}`, options)
          .then(response => response.json())
          .catch(err => ({ error: true, imdbID }))
      )
    );

    res.json({ watchlist: movieDetails });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch movie details' });
  }
});
router.get('/', (req, res) => {
  res.json({ watchlist: req.user.watchlist });
});

router.post('/', async (req, res) => {
  const { imdbID } = req.body;
  if (!req.user.watchlist.includes(imdbID)) req.user.watchlist.push(imdbID);
  await req.user.save();
  res.json({ success: true });
});

router.delete('/', async (req, res) => {
  const { imdbID } = req.body;
  req.user.watchlist = req.user.watchlist.filter(id => id !== imdbID);
  await req.user.save();
  res.json({ success: true });
});

module.exports = router;
