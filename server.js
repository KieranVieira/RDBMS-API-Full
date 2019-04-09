const express = require('express');
const helmet = require('helmet');
const cohortRouter = require('./routes/cohort-router')
const studentsRouter = require('./routes/students-router')

const server = express();

server.use(express.json());
server.use(helmet())
server.use('/api/cohort', cohortRouter);
server.use('/api/students', studentsRouter);

module.exports = server;