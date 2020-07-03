import mongoose from 'mongoose';
import express from 'express';
import { router } from './routes/routes.js';
import dotenv from 'dotenv';
dotenv.config();

//Conexão com o banco
(async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.USERDB}:${process.env.PWDDB}@alecsander-igtibootcamp-fullstack-ofsjp.mongodb.net/grades?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('Conectado ao MongosDB Atlas');
  } catch (err) {
    console.log({ err: err.message });
  }
})();

const app = express();

app.use(express.json());
app.use(router);

app.listen(process.env.PORT, () => {
  console.log('Api iniciada com sucesso!');
});
