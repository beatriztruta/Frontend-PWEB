import React from 'react';

export default function Profile() {
  return (
    <div style={{ padding: '2rem', backgroundColor: '#b3ecff', minHeight: '100vh' }}>
      <h2>Perfil do Usuário</h2>
      <p>Nome: Fulano de Silva</p>
      <p>Email: exemplo@email.com</p>
      <div style={{ marginTop: '1rem' }}>
        <button style={buttonStyle}>Ver Compras</button>
        <button style={buttonStyle}>Editar Perfil</button>
        <button style={buttonStyleDanger}>Sair</button>
      </div>
    </div>
  );
}

const buttonStyle = {
  backgroundColor: '#ffeb3b',
  border: 'none',
  padding: '0.5rem 1rem',
  marginRight: '0.5rem',
  borderRadius: '5px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

const buttonStyleDanger = {
  ...buttonStyle,
  backgroundColor: '#f44336',
  color: '#fff'
};