const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true
    },
    jarId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Jar'
    },
    currentJob: {
      type: Boolean,
      default: false
    },
    completed: {
      type: Boolean,
      default: false
    },
    minutesRequired: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
