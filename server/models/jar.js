const mongoose = require('mongoose');

const jarSchema = new mongoose.Schema(
  {
    jarName: {
      type: String,
      required: true
    },
    ownerFirebaseId: {
      type: String,
      required: true,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

jarSchema.virtual('jobs', {
  ref: 'Job',
  localField: '_id',
  foreignField: 'jarId'
});

const Jar = mongoose.model('Jar', jarSchema);

module.exports = Jar;
