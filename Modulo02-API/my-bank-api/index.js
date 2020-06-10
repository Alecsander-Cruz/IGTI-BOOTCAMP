var express = require('express');
var fs = require('fs').promises;
var accountsRouter = require('./routes/accounts.js');

global.fileName = 'accounts.json';

var app = express();

app.use(express.json());

app.use('/account', accountsRouter);

app.listen(3000, async () => {
  try {
    await fs.readFile(global.fileName, 'utf8');
    console.log('API Started');
  } catch (err) {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };
    // try {
    //   await fs.writeFile(global.fileName, JSON.stringify(initialJson));
    // } catch (err) {
    //   console.log(err);
    // }
  }
});
