import React from 'react';

export default function AdminPurchases() {
  const compras = [
    { id: 1, nome: "Fulano", total: "R$ 120,00", data: "17/03/2025" },
    { id: 2, nome: "Ciclano", total: "R$ 79,98", data: "16/03/2025" },
  ];

  return (
    <div style={{ padding: '2rem', backgroundColor: '#b3ecff', minHeight: '100vh' }}>
      <h2>Admin - Compras</h2>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {compras.map(c => (
          <div key={c.id} style={{
            backgroundColor: '#fff',
            padding: '1rem',
            borderRadius: '10px',
            width: '220px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}>
            <p><strong>Cliente:</strong> {c.nome}</p>
            <p><strong>Total:</strong> {c.total}</p>
            <p><strong>Data:</strong> {c.data}</p>
            <button style={btnStyle}>Detalhes</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const btnStyle = {
  backgroundColor: '#ffeb3b',
  border: 'none',
  padding: '0.4rem',
  width: '100%',
  borderRadius: '5px',
  cursor: 'pointer'
};