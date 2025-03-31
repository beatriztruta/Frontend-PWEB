import React from 'react';

export default function AdminCarts() {
  const carrinhos = [
    { id: 1, usuario: "Fulano", total: "R$ 120,00", status: "finalizado" },
    { id: 2, usuario: "Ciclano", total: "R$ 79,98", status: "pendente" },
  ];

  return (
    <div style={{ padding: '2rem', backgroundColor: '#b3ecff', minHeight: '100vh' }}>
      <h2>Admin - Carrinhos</h2>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {carrinhos.map(c => (
          <div key={c.id} style={{
            backgroundColor: '#fff',
            padding: '1rem',
            borderRadius: '10px',
            width: '220px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}>
            <p><strong>Usuário:</strong> {c.usuario}</p>
            <p><strong>Total:</strong> {c.total}</p>
            <p><strong>Status:</strong> <span style={{
              color: c.status === 'finalizado' ? 'green' : 'red',
              fontWeight: 'bold'
            }}>{c.status}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}