import mongoose from 'mongoose';

(async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://alecsandercruz:g4l3g0ss@alecsander-igtibootcamp-fullstack-ofsjp.mongodb.net/grades?retryWrites=true&w=majority',
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
  } catch (err) {
    console.log('Erro ao conectar ao Mongo DB Atlas!');
  }
})();

//criando o modelo da coleção
const studentSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  subject: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  value: {
    type: Number,
    require: true,
  },
  lastModified: {
    type: Date,
    default: Date.now(),
  },
});

//definindo o modelo da coleção
mongoose.model('student', studentSchema, 'student');

const student = mongoose.model('student');

new student({
  name: 'Alberto Cerqueira',
  subject: 'Física',
  type: 'Trabalho Prático',
  value: 46,
})
  .save()
  .then(() => {
    console.log('documento registrado!');
  })
  .catch((err) => {
    console.log('Falha ao inserir o documento!');
  });
