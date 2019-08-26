const express = require('express');
const router = new express.Router();
const Jar = require('../models/jar');

//Add new jar
router.post('/jars', (req, res) => {
  const jarName = req.body.jarName;
  const ownerFirebaseId = req.body.ownerFirebaseId;
  const jar = new Jar({ jarName, ownerFirebaseId });
  try {
    Jar.find({ ownerFirebaseId, jarName }).then(async jars => {
      if (jars.length > 0) {
        res.send('A jar by that name already exists');
      } else {
        await jar.save();
        Jar.find({ ownerFirebaseId }).then(jars => res.send(jars));
      }
    });
  } catch (e) {
    res.status(400).send();
  }
});

//get all jars associated with current user
router.get('/jars/:userId', (req, res) => {
  const ownerFirebaseId = req.params.userId;
  try {
    Jar.find({ ownerFirebaseId }).then(jars => {
      res.send(jars);
    });
  } catch (e) {
    res.status(400).send();
  }
});

//get jar by ID
router.get('/jars/jobs/:jarId', (req, res) => {
  const jarId = req.params.jarId;
  try {
    Jar.findById(jarId).then(async jar => {
      if (jar) {
        await jar.populate('jobs').execPopulate();
        res.send({ jarName: jar.jarName, jobs: jar.jobs });
      }
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
