const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const logger = require('morgan');
const views = require("./views/views");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
// app.use(bodyParser.text());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/public", express.static("public"));
app.set("view engine", "pug");
app.set("views", __dirname + "/public/views");

app.use(logger('dev'));

app.use('/', views);
app.use("/string", indexRouter);
app.use('/users', usersRouter);


module.exports = app;
