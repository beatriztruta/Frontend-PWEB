import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();
  const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

  const handleRegister = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      await axios.post(`${BACKEND_BASE_URL}/api/users`, {
        name: nome,
        email: email,
        password: senha,
        admin: false
      });

      navigate('/'); 
    } catch (err) {
      console.error(err);
      setErro('Erro ao registrar. Verifique os dados e tente novamente.');
    }
  };

  return (
    <div style={{
      backgroundColor: '#b3ecff',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        width: '300px',
        textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Registrar-se</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={e => setNome(e.target.value)}
            style={inputStyle}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            style={inputStyle}
          />
          {erro && <p style={{ color: 'red', fontSize: '0.85rem' }}>{erro}</p>}
          <button type="submit" style={buttonStyle}>Registrar</button>
        </form>
        <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
          <a href="/" style={{ color: '#333', textDecoration: 'underline' }}>
            Já possui uma conta?
          </a>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.5rem',
  marginBottom: '1rem',
  borderRadius: '5px',
  border: '1px solid #ccc'
};

const buttonStyle = {
  width: '100%',
  padding: '0.5rem',
  backgroundColor: '#ffeb3b',
  border: 'none',
  borderRadius: '5px',
  fontWeight: 'bold',
  cursor: 'pointer'
};