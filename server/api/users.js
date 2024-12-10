/* eslint-disable no-undef */

const express = require('express');
const user = require('../models/user');
const router = express.Router();

// GET route for the home page
router.get('/', async (req, res) => {
  try {
    const users = await user.find();
    res.render('index', { message: null, error: null, users });
  } catch (err) {
    console.error('Error fetching user data:', err);
    res.status(500).render('index', { error: 'Error fetching user data', users: [] });
  }
});

// POST route for adding a user
router.post('/user', async (req, res) => {
  try {
    const newUser = new user({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      age: req.body.age,
    });
    await newUser.save();
    res.render('index', { message: 'User data saved successfully!', error: null, users: await user.find() });
  } catch (err) {
    console.error('Error saving user data:', err);
    res.status(500).render('index', { error: 'Error saving user data', message: null, users: [] });
  }
});

module.exports = router;


// const express = require('express');
// const router = express.Router();

// const user = require('../models/user');

// router.get('/', (req, res) => {
//   user
//     .find()
//     .then((users) => res.json(users))
//     .catch((err) => console.log(err));
// });
// router.post('/', (req, res) => {
//   const { name, email } = req.body;
//   const newUser = new user({
//     name: name,
//     email: email,
//   });
//   newUser
//     .save()
//     .then(() =>
//       res.json({
//         message: 'Created account successfully',
//       }),
//     )
//     .catch((err) =>
//       res.status(400).json({
//         error: err,
//         message: 'Error creating account',
//       }),
//     );
// });

// module.exports = router;
