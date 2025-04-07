import React from 'react';

export default function Register() {
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
        <input type="text" placeholder="Nome" style={inputStyle} />
        <input type="email" placeholder="E-mail" style={inputStyle} />
        <input type="password" placeholder="Senha" style={inputStyle} />
        <button style={buttonStyle}>Registrar</button>
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