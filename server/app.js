const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('./database/mongoose');
const connection = mongoose.connection;
connection.once('open', function() {
  console.log('MongoDB database connection established successfully');
});

const userRouter = require('./routers/user');
const jarRouter = require('./routers/jars');
const taskRouter = require('./routers/tasks');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(userRouter);
app.use(jarRouter);
app.use(taskRouter);

module.exports = app;
