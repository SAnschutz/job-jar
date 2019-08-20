const express = require('express');
const mongoose = require('mongoose');
const router = new express.Router();
const Task = require('../models/task');

//add a task
router.post('/tasks', (req, res) => {
  const task = new Task(req.body);

  try {
    task.jarId = mongoose.Types.ObjectId(req.body.jarId);

    task.save();
    res.send(task);
  } catch (e) {
    res.status(400).send();
  }
});

//get all tasks associated with current jar
router.get('/tasks/:jarId', (req, res) => {
  const jarId = mongoose.Types.ObjectId(req.params.jarId);

  try {
    Task.find({ jarId }).then(tasks => {
      res.send(tasks);
    });
  } catch (e) {
    res.status(400).send();
  }
});

//Delete task by ID
router.delete('/tasks/:taskId', (req, res) => {
  const _id = req.params.taskId;
  try {
    Task.findByIdAndRemove(_id).then(task => {
      if (!task) {
        return res.send('No task with that ID');
      }
      // console.log(task);
      res.send('task deleted');
    });
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = router;
