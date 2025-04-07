import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from  '../contexts/AuthContext';

export default function Login() {
  const { setUserEmail, setToken } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();
  const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      const response = await axios.post(`${BACKEND_BASE_URL}/api/auth/login`, {
        email: email,
        password: senha,
      });

      const token = response.data.token;

      setUserEmail(email);
      setToken(token);
      navigate('/home');
    } catch (err) {
      console.error(err);
      setErro('E-mail ou senha inválidos.');
    }
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h1 style={{ marginBottom: '1.5rem' }}>⚙️ API</h1>
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
        <button onClick={handleLogin} style={buttonStyle}>
          Login
        </button>
        <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
          <a href="/register" style={{ color: '#333', textDecoration: 'underline' }}>
            Não possui uma conta?
          </a>
        </p>
      </div>
    </div>
  );
}

const containerStyle = {
  backgroundColor: '#b3ecff',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const formStyle = {
  backgroundColor: '#fff',
  padding: '2rem',
  borderRadius: '10px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  width: '300px',
  textAlign: 'center',
};

const inputStyle = {
  width: '100%',
  padding: '0.5rem',
  marginBottom: '1rem',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  width: '100%',
  padding: '0.5rem',
  backgroundColor: '#ffeb3b',
  border: 'none',
  borderRadius: '5px',
  fontWeight: 'bold',
  cursor: 'pointer',
};