const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
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

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
