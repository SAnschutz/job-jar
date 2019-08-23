const express = require('express');
const router = new express.Router();
const User = require('../models/user');

//Search for user based on firebaseId.  If exists, send user object.  If not, create user and send user object.

router.post('/user', (req, res) => {
  const firebaseId = req.body.firebaseId;
  const newUser = new User(req.body);
  try {
    User.findOne({ firebaseId }).then(async user => {
      if (user) {
        await user.populate('jars').execPopulate();
        res.json({ user, jars: user.jars });
      } else {
        newUser.save();
        res.send(newUser);
      }
    });
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = router;
