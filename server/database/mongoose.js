const mongoose = require('mongoose');

mongoose.connect(process.env.PROD_MONGODB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});
