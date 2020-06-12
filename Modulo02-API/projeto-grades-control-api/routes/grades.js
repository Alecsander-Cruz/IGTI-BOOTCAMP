var express = require('express');
var fs = require('fs').promises;
var calculus = require('../libs/calculus.js');

var router = express.Router();

//OK
router.post('/', async (req, res) => {
  let grade = req.body;
  try {
    let data = await fs.readFile(global.fileName, 'utf8');
    let json = JSON.parse(data);
    grade = { id: json.nextId++, ...grade, timestamp: new Date() };
    json.grades.push(grade);

    await fs.writeFile(global.fileName, JSON.stringify(json));
    res.send('cadastrado com sucesso!');
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

//OK
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

//OK
router.get('/id/:id', async (req, res) => {
  try {
    let data = await fs.readFile(global.fileName, 'utf8');
    let json = JSON.parse(data);
    const grade = json.grades.find(
      (grade) => grade.id === parseInt(req.params.id, 10)
    );
    if (grade) {
      res.send(grade);
    } else {
      res.send('Esse id não pôde ser encontrado!');
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

//OK
router.delete('/id/:id', async (req, res) => {
  try {
    let data = await fs.readFile(global.fileName, 'utf8');
    let json = JSON.parse(data);
    let grades = json.grades.filter(
      (grade) => grade.id !== parseInt(req.params.id, 10)
    );
    json.grades = grades;

    await fs.writeFile(global.fileName, JSON.stringify(json));
    res.send('deletado com sucesso!');
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

//OK
router.put('/', async (req, res) => {
  let updateGrade = req.body;
  try {
    let data = await fs.readFile(global.fileName, 'utf8');
    let json = JSON.parse(data);
    const index = json.grades.findIndex((grade) => grade.id === updateGrade.id);
    if (index === -1) throw new Error('Este id não pode ser encontrado!');
    json.grades[index].student = updateGrade.student;
    json.grades[index].subject = updateGrade.subject;
    json.grades[index].type = updateGrade.type;
    json.grades[index].value = updateGrade.value;
    json.grades[index].timestamp = new Date();

    await fs.writeFile(global.fileName, JSON.stringify(json));
    res.send('atualizado com sucesso!');
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

//OK
router.get('/notafinal', async (req, res) => {
  const getNota = req.body;
  try {
    const data = await fs.readFile(global.fileName, 'utf8');
    const json = JSON.parse(data);
    let aluno = json.grades.filter((grade) => {
      if (grade.student.toLowerCase() === getNota.student.toLowerCase()) {
        if (grade.subject.toLowerCase() === getNota.subject.toLowerCase()) {
          return grade;
        }
      }
    });
    console.log(aluno);
    let notaFinal = aluno.map((nota) => {
      return nota.value;
    });
    console.log(notaFinal);
    console.log('-----------------');
    // res.send({
    //   'O somátorio de notas do aluno nesta determinada matéria é': await calculus.sum(
    //     notaFinal
    //   ),
    // });
    res.send(
      'O somátorio de notas do aluno "' +
        getNota.student.toUpperCase() +
        '", na matéria "' +
        getNota.subject.toUpperCase() +
        '" é: ' +
        (await calculus.sum(notaFinal))
    );
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

//OK
router.get('/media', async (req, res) => {
  const getMedia = req.body;
  try {
    const data = await fs.readFile(global.fileName, 'utf8');
    const json = JSON.parse(data);
    let materia = json.grades.filter((grade) => {
      if (grade.subject.toLowerCase() === getMedia.subject.toLowerCase()) {
        if (grade.type.toLowerCase() === getMedia.type.toLowerCase()) {
          return grade;
        }
      }
    });
    console.log(materia);
    console.log('----------------------------');

    let media = materia.map((nota) => nota.value);
    console.log(media);
    res.send(
      'A média de notas da matéria "' +
        getMedia.subject.toUpperCase() +
        '", no "' +
        getMedia.type.toUpperCase() +
        '" é: ' +
        (await calculus.average(media))
    );

    //
    res.end();
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

//OK
router.get('/melhores', async (req, res) => {
  const getBest = req.body;
  try {
    const data = await fs.readFile(global.fileName, 'utf8');
    const json = JSON.parse(data);
    let grades = json.grades.filter((grade) => {
      if (grade.subject.toLowerCase() === getBest.subject.toLowerCase()) {
        if (grade.type.toLowerCase() === getBest.type.toLowerCase()) {
          return grade;
        }
      }
    });
    console.log(grades);
    console.log('--------------------');
    grades.sort((a, b) => b.value - a.value);
    if (grades.length > 3) grades.pop();
    //
    res.send({
      'As melhores notas desta máteria e tipo de avalição foram: ': grades,
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
