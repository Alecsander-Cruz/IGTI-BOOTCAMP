var express = require('express');
var fs = require('fs').promises;
var gradesRouter = require('./routes/grades.js');

global.fileName = './grades.json';

var app = express();

app.use(express.json());

app.use('/grade', gradesRouter);

app.listen(3000, async () => {
  try {
    await fs.readFile(global.fileName, 'utf8');
    console.log('API Started');
  } catch (err) {
    console.log(err);
  }
});
