import express from 'express';
import studentModel from '../models/student.js';

const router = express();

router.get('/student', async (req, res) => {
  try {
    const student = await studentModel.find({});
    res.send(student);
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

router.post('/student', async (req, res) => {
  try {
    const student = new studentModel(req.body);
    await student.save();
    res.send(student);
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

router.delete('/student/:id', async (req, res) => {
  try {
    // outra possibilidade eh usar o findOneAndDelete({_id: req.params.id})
    const student = await studentModel.findByIdAndDelete(req.params.id);
    if (!student) throw new Error('Documento não encontrado na coleção!');
    res.send();
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

router.patch('/student/:id', async (req, res) => {
  try {
    const student = await studentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.send(student);
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

export { router };
