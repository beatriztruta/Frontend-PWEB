import React from 'react';

export default function Purchases() {
  const compras = [
    { id: 1, total: "R$ 120,00", data: "17/03/2025" },
    { id: 2, total: "R$ 79,98", data: "16/03/2025" },
  ];

  return (
    <div style={{ padding: '2rem', backgroundColor: '#b3ecff', minHeight: '100vh' }}>
      <h2>Minhas Compras</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {compras.map(c => (
          <div key={c.id} style={{
            backgroundColor: '#fff',
            padding: '1rem',
            borderRadius: '10px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            width: '200px'
          }}>
            <p><strong>Total:</strong> {c.total}</p>
            <p><strong>Data:</strong> {c.data}</p>
          </div>
        ))}
      </div>
    </div>
  );
}