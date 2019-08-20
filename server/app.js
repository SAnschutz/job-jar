const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

require('./database/mongoose');
const connection = mongoose.connection;
connection.once('open', function() {
  console.log('MongoDB database connection established successfully');
});

// app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const userRouter = require('./routers/user');
const jarRouter = require('./routers/jars');
const taskRouter = require('./routers/tasks');

// app.use(express.json());
app.use(userRouter);
app.use(jarRouter);
app.use(taskRouter);

module.exports = app;
