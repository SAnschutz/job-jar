const express = require('express');
const mongoose = require('mongoose');
const router = new express.Router();
const Job = require('../models/job');

//add a job
router.post('/jobs', (req, res) => {
  const job = new Job(req.body);

  try {
    job.jarId = mongoose.Types.ObjectId(req.body.jarId);

    job.save();
    res.send(job);
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
});

//get all jobs associated with current jar
router.get('/jobs/:jarId', (req, res) => {
  const jarId = mongoose.Types.ObjectId(req.params.jarId);

  try {
    Job.find({ jarId }).then(jobs => {
      res.send(jobs);
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

//get UNCOMPLETED jobs associated with current jarId
router.get('/jobs/todo/:jarId', (req, res) => {
  const jarId = mongoose.Types.ObjectId(req.params.jarId);

  try {
    Job.find({ jarId, completed: false }).then(jobs => {
      res.send(jobs);
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

//get COMPLETED jobs associated with current jarId
router.get('/jobs/done/:jarId', (req, res) => {
  const jarId = mongoose.Types.ObjectId(req.params.jarId);

  try {
    Job.find({ jarId, completed: true }).then(jobs => {
      res.send(jobs);
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

//mark currentJob = true
router.post('/jobs/select/:jobId', (req, res) => {
  const _id = mongoose.Types.ObjectId(req.params.jobId);

  try {
    Job.findOne({ _id }).then(async job => {
      job.currentJob = true;
      await job.save();
      res.status(200).send(job);
    });
  } catch (e) {
    res.status(400).send();
  }
});

//mark currentJob = false
router.post('/jobs/return/:jobId', (req, res) => {
  const jobId = req.params.jobId;

  try {
    Job.findById(jobId).then(async job => {
      job.currentJob = false;
      await job.save();
      res.status(200).send(job);
    });
  } catch (e) {
    res.status(400).send();
  }
});

//mark completed
router.post('/jobs/completed/:jobId', (req, res) => {
  const jobId = req.params.jobId;

  try {
    Job.findById(jobId).then(async job => {
      job.completed = true;
      job.currentJob = false;
      await job.save();
      res.status(200).send(job);
    });
  } catch (e) {
    res.status(400).send();
  }
});

//Delete job by ID
router.delete('/jobs/:jobId', (req, res) => {
  const _id = req.params.jobId;
  try {
    Job.findByIdAndRemove(_id).then(job => {
      if (!job) {
        return res.send('No job with that ID');
      }
      res.send('job deleted');
    });
  } catch (e) {
    res.status(400).send();
  }
});

//Delete all completed jobs for current jar (returns number of jobs deleted)
router.delete('/jobs/completed/:jarId', (req, res) => {
  const jarId = mongoose.Types.ObjectId(req.params.jarId);

  try {
    Job.deleteMany({ jarId, completed: true }).then(data => {
      res.json(data.deletedCount);
    });
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = router;
