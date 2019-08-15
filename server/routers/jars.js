const express = require('express');
const router = new express.Router();
const Jar = require('../models/jar');

//Add new jar
router.post('/jars', (req, res) => {
  const jarName = req.body.jarName;
  const ownerFirebaseId = req.body.ownerFirebaseId;
  const jar = new Jar({ jarName, ownerFirebaseId });
  try {
    Jar.find({ ownerFirebaseId, jarName }).then(jars => {
      if (jars.length > 0) {
        console.log(res);
        res.send('A jar by that name already exists');
      } else {
        jar.save();
        res.send(jar);
      }
    });
  } catch (e) {
    res.status(400).send();
  }
});

//get all jars associated with current user
router.get('/jars', (req, res) => {
  const ownerFirebaseId = req.body.ownerFirebaseId;
  try {
    Jar.find({ ownerFirebaseId }).then(jars => {
      res.send(jars);
    });
  } catch (e) {
    res.status(400).send();
  }
});

//get jar by ID
router.get('/jars/:id', (req, res) => {
  const _id = req.params.id;
  try {
    Jar.findById(_id).then(async jar => {
      if (jar) {
        await jar.populate('tasks').execPopulate();
        res.json({ jarName: jar.jarName, tasks: jar.tasks });
      }
    });
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = router;
