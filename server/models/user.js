const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true
    },
    firebaseId: {
      type: String
      // required: true
    },
    email: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

userSchema.virtual('jars', {
  ref: 'Jar',
  localField: 'firebaseId',
  foreignField: 'ownerFirebaseId'
});

const User = mongoose.model('User', userSchema);

module.exports = User;
