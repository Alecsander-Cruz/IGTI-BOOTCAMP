import express from 'express';

const app = express();
const port = 3030;

app.get('/', (req, res) => res.send('hello world!'));

app.post('/', (req, res) => res.send('ai sim hein!'));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
