/* eslint-disable no-undef */

const express = require('express');
const userData = require('../models/user');
const router = express.Router();

// GET route for the home page
router.get('/users/:id?', async (req, res) => {
  const id = req?.params?.id;
  if (id) {
    userData.findById(id.match(/^[0-9a-fA-F]{24}$/))
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: 'No user with id ' + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: 'Error retrieving user with id : ' + id + ' ' + err });
      });
  } else {
    try {
      const users = await userData.find();
      res.status(200).json({ error: null, users });
    } catch (err) {
      return res.status(500).send({ error: 'Error fetching user data : ' + err, users: [] });
    }
  }
});

// POST route for adding a user
router.post('/users', async (req, res) => {
  try {
    if (!Object.keys(req.body).length) {
      res.status(400).send({ message: 'Request body cannot be empty for create user' });
      return;
    }
    const newUser = new userData({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      age: req.body.age,
    });
    await newUser.save();
    res.status(200).json({
      message: 'User data saved successfully!',
      error: null,
      users: await userData.find(),
    });
  } catch (err) {
    res.status(500).send({ error: 'Error saving user data : ' + err, users: [] });
  }
});

module.exports = router;
