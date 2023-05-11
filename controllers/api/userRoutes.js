const router = require('express').Router();
const { User } = require('../../models');


// create a user
router.post('/', async (req, res) => {
  try {
    const userData = new User();
    userData.username = req.body.username;
    userData.password = req.body.password;
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json({ user: userData, message: 'User successfully created!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Handle user login
router.post('/login', async (req, res) => {
  try {
    // Find the user data based on the provided username
    const userData = await User.findOne({ where: { username: req.body.username } });

    // If user data is not found, return an error response
    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Check if the provided password is valid
    const validPassword = await userData.checkPassword(req.body.password);

    // If the password is not valid, return an error response
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Save user session data
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      // Return a success response with user data
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    // Return an error response if an exception occurs
    res.status(400).json(err);
  }
});

// Handle user logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Destroy the session and return a success response
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    // If the user is not logged in, return a not found response
    res.status(404).end();
  }
});


module.exports = router;
