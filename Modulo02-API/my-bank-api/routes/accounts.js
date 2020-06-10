var express = require('express');
var fs = require('fs').promises;

var router = express.Router();

router.post('/', async (req, res) => {
  let account = req.body;
  try {
    let data = await fs.readFile(global.fileName, 'utf8');
    let json = JSON.parse(data);
    account = { id: json.nextId++, ...account };
    json.accounts.push(account);

    await fs.writeFile(global.fileName, JSON.stringify(json));
    res.send('cadastrado com sucesso!');
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get('/', async (_req, res) => {
  try {
    let data = await fs.readFile(global.fileName, 'utf8');
    let json = JSON.parse(data);
    delete json.nextId;
    res.send(json);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    let data = await fs.readFile(global.fileName, 'utf8');
    let json = JSON.parse(data);
    const account = json.accounts.find(
      (account) => account.id === parseInt(req.params.id, 10)
    );
    if (account) {
      res.send(account);
    } else {
      res.send('Esse id não pôde ser encontrado!');
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    let data = await fs.readFile(global.fileName, 'utf8');
    let json = JSON.parse(data);
    let accounts = json.accounts.filter(
      (account) => account.id !== parseInt(req.params.id, 10)
    );
    json.accounts = accounts;

    await fs.writeFile(global.fileName, JSON.stringify(json));
    res.send('deletado com sucesso!');
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.put('/', async (req, res) => {
  let updateAccount = req.body;
  try {
    let data = await fs.readFile(global.fileName, 'utf8');
    let json = JSON.parse(data);
    const index = json.accounts.findIndex(
      (account) => account.id === updateAccount.id
    );
    json.accounts[index].name = updateAccount.name;
    json.accounts[index].balance = updateAccount.balance;

    await fs.writeFile(global.fileName, JSON.stringify(json));
    res.send('atualizado com sucesso!');
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.post('/deposit', async (req, res) => {
  let updateBalance = req.body;
  try {
    if (updateBalance.value <= 0) {
      throw new Error('Valor do depósito tem que ser maior do que zero!');
    } else {
      let data = await fs.readFile(global.fileName, 'utf8');
      let json = JSON.parse(data);
      let index = json.accounts.findIndex(
        (account) => account.id === updateBalance.id
      );
      json.accounts[index].balance += updateBalance.value;
      await fs.writeFile(global.fileName, JSON.stringify(json));
      // prettier-ignore
      res.send(
        `Atualizado com sucesso! Adicionado ao saldo um total de ${updateBalance.value}.
        O saldo total desta conta é ${json.accounts[index].balance}`
      );
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.post('/withdraw', async (req, res) => {
  let updateBalance = req.body;
  try {
    if (updateBalance.value <= 0) {
      throw new Error('Valor do saque tem que ser maior do que zero!');
    } else {
      let data = await fs.readFile(global.fileName, 'utf8');
      let json = JSON.parse(data);
      let index = json.accounts.findIndex(
        (account) => account.id === updateBalance.id
      );
      if (updateBalance.value > json.accounts[index].balance)
        throw new Error(
          'O valor a ser sacado é maior do que o saldo da conta! Transação não autorizada!'
        );
      json.accounts[index].balance -= updateBalance.value;
      await fs.writeFile(global.fileName, JSON.stringify(json));
      // prettier-ignore
      res.send(
        `Atualizado com sucesso! Removido do saldo um total de ${updateBalance.value}.
         O saldo total desta conta é ${json.accounts[index].balance}`
      );
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
