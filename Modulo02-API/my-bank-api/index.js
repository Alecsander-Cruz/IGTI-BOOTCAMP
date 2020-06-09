var express = require('express');
var fs = require('fs');
var accountsRouter = require('./routes/accounts.js');

global.fileName = 'accounts.json';

var app = express();

app.use(express.json());

app.use('/account', accountsRouter);

app.listen(3000, () => {
  try {
    fs.readFile(global.fileName, 'utf8', (err, _data) => {
      if (err) {
        const initialJson = {
          nextId: 1,
          accounts: [],
        };
        fs.writeFile(global.fileName, JSON.stringify(initialJson), (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    });
  } catch (err) {
    console.log(err);
  }

  console.log('API Started');
});
