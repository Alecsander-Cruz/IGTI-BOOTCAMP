import React from 'react';
import Action from './Action';

export default function GradesControl({ grades, onDelete, onPersist }) {
  const tableGrades = [];

  let currentStudent = grades[0].student;
  let currentSubject = grades[0].subject;
  let currentGrades = [];
  let id = 1;

  grades.forEach((grade) => {
    if (grade.subject !== currentSubject) {
      tableGrades.push({
        id: id++,
        student: currentStudent,
        subject: currentSubject,
        grades: currentGrades,
      });

      currentSubject = grade.subject;
      currentGrades = [];
    }
    if (grade.student !== currentStudent) {
      currentStudent = grade.student;
    }
    currentGrades.push(grade);
  });

  //inserção do ultimo elemento, após o forEach
  tableGrades.push({
    id: id++,
    student: currentStudent,
    subject: currentSubject,
    grades: currentGrades,
  });

  const handleActionClick = (id, type) => {
    const grade = grades.find((grade) => grade.id === id);

    if (type === 'delete') {
      onDelete(grade);
      return;
    }

    onPersist(grade);
  };

  return (
    <div className="center">
      {tableGrades.map(({ id, grades }) => {
        const finalGrade = grades.reduce((acc, curr) => acc + curr.value, 0);
        const gradeStyle =
          finalGrade >= 70 ? styles.goodGrade : styles.badGrade;

        return (
          <table className="striped" style={styles.table} key={id}>
            <thead>
              <tr>
                <th className="center" style={{ width: '20%' }}>
                  Aluno
                </th>
                <th className="center" style={{ width: '20%' }}>
                  Avaliação
                </th>
                <th className="center" style={{ width: '20%' }}>
                  Nota
                </th>
                <th className="center" style={{ width: '20%' }}>
                  Disciplina
                </th>
                <th className="center" style={{ width: '20%' }}>
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {grades.map(
                ({ id, subject, student, type, value, isDeleted }) => {
                  return (
                    <tr key={id}>
                      <td className="center">{student}</td>
                      <td className="center">{subject}</td>
                      <td className="center">{type}</td>
                      <td className="center">{isDeleted ? '-' : value}</td>
                      <td className="center">
                        <Action
                          id={id}
                          onActionClick={handleActionClick}
                          type={isDeleted ? 'add' : 'edit'}
                        />
                        <Action
                          id={id}
                          onActionClick={handleActionClick}
                          type={!isDeleted && 'delete'}
                        />
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
            <tfoot>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td style={{ textAlign: 'right' }}>
                  <strong>Total</strong>
                </td>
                <td>
                  <span style={gradeStyle}>{finalGrade}</span>
                </td>
              </tr>
            </tfoot>
          </table>
        );
      })}
    </div>
  );
}

const styles = {
  goodGrade: {
    fontWeight: 'bold',
    color: 'green',
  },

  badGrade: {
    fontWeight: 'bold',
    color: 'red',
  },

  table: {
    margin: '20px',
    padding: '10px',
  },
};
