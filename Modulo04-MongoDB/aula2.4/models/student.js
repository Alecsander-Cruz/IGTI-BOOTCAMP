import mongoose from 'mongoose';

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
  subject: {
    type: String,
    required: true,
    lowercase: true,
  },
  type: {
    type: String,
    required: true,
    lowercase: true,
  },
  value: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 0) throw new Error('Valor da nota não pode ser negativo!');
    },
  },
  lastModified: {
    type: Date,
    default: Date.now(),
  },
});

const studentModel = mongoose.model('student', studentSchema, 'student');

export default studentModel;
