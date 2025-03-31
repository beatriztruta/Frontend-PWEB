import React from 'react';

export default function AdminUsers() {
  const usuarios = [
    { id: 1, nome: "Fulano da Silva", email: "email1@email.com" },
    { id: 2, nome: "Ciclano Souza", email: "email2@email.com" },
  ];

  return (
    <div style={{ padding: '2rem', backgroundColor: '#b3ecff', minHeight: '100vh' }}>
      <h2>Admin - Usuários</h2>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {usuarios.map(u => (
          <div key={u.id} style={{
            backgroundColor: '#fff',
            padding: '1rem',
            borderRadius: '10px',
            width: '250px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}>
            <p><strong>{u.nome}</strong></p>
            <p>{u.email}</p>
            <button style={btnStyle}>Gerenciar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const btnStyle = {
  backgroundColor: '#ffeb3b',
  border: 'none',
  padding: '0.5rem',
  width: '100%',
  borderRadius: '5px',
  fontWeight: 'bold',
  cursor: 'pointer'
};