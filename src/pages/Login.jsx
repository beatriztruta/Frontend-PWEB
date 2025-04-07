import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === 'teste@email.com' && senha === '123456') {
      setUser({ nome: 'Usuário Fictício', email });
      navigate('/home');
    } else {
      setErro('E-mail ou senha inválidos. Use teste@email.com / 123456');
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
        <h1 style={{ marginBottom: '1.5rem' }}>⚙️ QAPI</h1>
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