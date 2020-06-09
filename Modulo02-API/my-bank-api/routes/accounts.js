var express = require('express');
var fs = require('fs');

var router = express.Router();

router.post('/', (req, res) => {
  let account = req.body;

  fs.readFile(global.fileName, 'utf8', (err, data) => {
    if (!err) {
      try {
        let json = JSON.parse(data);
        account = { id: json.nextId++, ...account };
        json.accounts.push(account);

        fs.writeFile(global.fileName, JSON.stringify(json), (err) => {
          if (err) {
            console.log(err);
          } else {
            res.end();
          }
        });
      } catch (err) {
        res.status(400).send({ error: err.message });
      }
    } else {
      console.log('erro na leitura');
      res.send('erro na leitura');
      res.status(400).send({ error: err.message });
    }
  });
});

router.get('/', (_req, res) => {
  fs.readFile(global.fileName, 'utf8', (err, data) => {
    if (err) {
      res.status(400).send({ error: err.message });
    } else {
      let json = JSON.parse(data);
      delete json.nextId;
      res.send(json);
    }
  });
});

router.get('/:id', (req, res) => {
  fs.readFile(global.fileName, 'utf8', (err, data) => {
    if (err) {
      res.status(400).send({ error: err.message });
    } else {
      let json = JSON.parse(data);
      const account = json.accounts.find((account) => {
        return account.id === parseInt(req.params.id, 10);
      });
      if (account) {
        res.send(account);
      } else {
        res.send('Esse id não pôde ser localizado!');
      }
    }
  });
});

module.exports = router;
