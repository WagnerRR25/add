import React, { useState, useEffect } from 'react';
import './styles.css';

import { Card } from '../../components/Card';

export function Home() {
  // guarda nome do estado e função
  const [studentName, setStudentName] = useState('');
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({name: '', avatar: ''});

  function handleAddStudent(){
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    };
    
    setStudents(prevState => [...prevState, newStudent]);
  }
  // useEffect(() => {}, [studentName]); = estado será atualizado toda vez que o argumento do array for atualizado!
  // corpo do useEffect = "ser chamado toda vez que a pagina for atualizada"
  // console.log("useEffect foi chamado!")


  // useEffect(() => {
  //   fetch('https://api.github.com/users/WagnerRR25') //api do github
  //   .then(response => response.json())
  //   .then(data => {
  //     setUser({
  //       name: data.name,
  //       avatar: data.avatar_url,
  //     })

  //   })
  // }, []);

////////////////////////////**Com async** //////////////////////////

  useEffect(() => {
    async function fetchData() {
    const response = await fetch('https://api.github.com/users/WagnerRR25') //api do github
    const data = await response.json();
    console.log("DADOS ===> ", data);
    
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      });
    }
    fetchData();
  }, []);

  return (
    <div className="container">
      <header>
      <h1>Lista de Presença</h1>
      <div>
        <strong>{user.name}</strong>
        <img src={user.avatar} alt="Foto perfil" />
      </div> 
      </header>

    <input 
    type="text" 
    placeholder="Digite seu nome..." 
    onChange={e => setStudentName(e.target.value)}
    />

    <button 
    type="button" onClick={handleAddStudent}>
      Adicionar
    </button>

    {
      students.map(student => (
      <Card
      // Key= chave única
      key={student.time} 
      name={student.name} 
      time={student.time} 
      />
    ))
    }
    </div>
  )
}

//fragment 