import React, { useState, useEffect } from 'react';
import * as api from './api/apiService';
import Spinner from './components/Spinner/Spinner';
import GradesControl from './components/GradesControl';

export default function App() {
  const [allGrades, setAllGrades] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getGrades = async () => {
      const grades = await api.getAllGrades();
      setTimeout(() => {
        setAllGrades(grades);
      }, 2000);
    };
    getGrades();
  }, []);

  const handleDelete = () => {};

  const handlePersist = () => {};

  return (
    <div className="container">
      <h1 className="center">Controle de notas</h1>
      {allGrades.length > 0 && (
        <GradesControl
          grades={allGrades}
          onDelete={handleDelete}
          onPersist={handlePersist}
        />
      )}
      {allGrades.length === 0 && <Spinner description="Aguarde..." />}
    </div>
  );
}
