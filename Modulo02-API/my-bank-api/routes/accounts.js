var express = require('express');
var fs = require('fs');

var router = express.Router();

router.post('/', (req, res) => {
  let account = req.body;

  fs.readFile(global.fileName, 'utf8', (err, data) => {
    try {
      if (!err) {
        let json = JSON.parse(data);
        account = { id: json.nextId++, ...account };
        json.accounts.push(account);

        fs.writeFile(global.fileName, JSON.stringify(json), (err) => {
          if (err) {
            throw err;
          } else {
            res.send('cadastrado com sucesso');
          }
        });
      } else {
        throw err;
      }
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  });
});

router.get('/', (_req, res) => {
  fs.readFile(global.fileName, 'utf8', (err, data) => {
    try {
      if (err) {
        throw err;
      }
      let json = JSON.parse(data);
      delete json.nextId;
      res.send(json);
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  });
});

router.get('/:id', (req, res) => {
  fs.readFile(global.fileName, 'utf8', (err, data) => {
    try {
      if (err) {
        throw err;
      }
      let json = JSON.parse(data);
      const account = json.accounts.find((account) => {
        return account.id === parseInt(req.params.id, 10);
      });
      if (account) {
        res.send(account);
      } else {
        res.send('Esse id não pôde ser localizado!');
      }
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  });
});

router.delete('/:id', (req, res) => {
  fs.readFile(global.fileName, 'utf8', (err, data) => {
    try {
      if (err) throw err;
      let json = JSON.parse(data);
      //colocar depois um tratamento de erro aqui para caso o array filter retornado seja igual ao array ja existente
      let accounts = json.accounts.filter((account) => {
        return account.id !== parseInt(req.params.id, 10);
      });
      json.accounts = accounts;
      fs.writeFile(global.fileName, JSON.stringify(json), (err) => {
        if (err) throw err;
        res.send('deletado com sucesso!');
      });
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  });
});

router.put('/', (req, res) => {
  let updateAccount = req.body;
  fs.readFile(global.fileName, 'utf8', (err, data) => {
    try {
      if (err) throw err;
      let json = JSON.parse(data);
      const index = json.accounts.findIndex((account) => {
        return account.id === updateAccount.id;
      });
      json.accounts[index].name = updateAccount.name;
      json.accounts[index].balance = updateAccount.balance;

      fs.writeFile(global.fileName, JSON.stringify(json), (err) => {
        if (err) throw err;
        res.send('atualizado com sucesso!');
      });
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  });
});

router.post('/deposit', (req, res) => {
  let updateBalance = req.body;
  try {
    if (updateBalance.value < 0) {
      throw new Error('Valor do depósito tem que ser maior que 0!');
    } else {
      fs.readFile(global.fileName, 'utf8', (err, data) => {
        try {
          if (err) throw err;
          let json = JSON.parse(data);
          const index = json.accounts.findIndex((account) => {
            return account.id === updateBalance.id;
          });
          json.accounts[index].balance += updateBalance.value;

          fs.writeFile(global.fileName, JSON.stringify(json), (err) => {
            if (err) throw err;
            res.send(
              `atualizado com sucesso! adicionado ao saldo um total de ${updateBalance.value}. O saldo total desta conta é ${json.accounts[index].balance}`
            );
          });
        } catch (err) {
          res.status(400).send({ error: err.message });
        }
      });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.post('/withdraw', (req, res) => {
  let updateBalance = req.body;
  try {
    if (updateBalance.value < 0) {
      throw new Error('Valor do saque tem que ser maior que 0!');
    } else {
      fs.readFile(global.fileName, 'utf8', (err, data) => {
        try {
          if (err) throw err;
          let json = JSON.parse(data);
          const index = json.accounts.findIndex((account) => {
            return account.id === updateBalance.id;
          });
          if (updateBalance.value <= json.accounts[index].balance) {
            json.accounts[index].balance -= updateBalance.value;
            fs.writeFile(global.fileName, JSON.stringify(json), (err) => {
              if (err) throw err;
              res.send(
                `atualizado com sucesso! removido do saldo um total de ${updateBalance.value}. O saldo total desta conta é ${json.accounts[index].balance}`
              );
            });
          } else {
            throw new Error(
              'O valor a ser sacado é maior do que o saldo da conta! Transação não autorizada!'
            );
          }
        } catch (err) {
          res.status(400).send({ error: err.message });
        }
      });
    }
  } catch (err) {}
});

module.exports = router;
