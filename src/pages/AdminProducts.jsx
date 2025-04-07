import React from 'react';

export default function AdminProducts() {
  const produtos = [
    { id: 1, nome: "Camiseta Básica", preco: "R$ 39,99" },
    { id: 2, nome: "Camiseta Premium", preco: "R$ 59,90" },
  ];

  return (
    <div style={{ padding: '2rem', backgroundColor: '#b3ecff', minHeight: '100vh' }}>
      <h2>Admin - Produtos</h2>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {produtos.map(p => (
          <div key={p.id} style={{
            backgroundColor: '#fff',
            padding: '1rem',
            borderRadius: '10px',
            width: '200px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}>
            <h4>{p.nome}</h4>
            <p>{p.preco}</p>
            <button style={btnStyle}>Editar</button>
            <button style={deleteStyle}>Excluir</button>
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
  marginTop: '0.5rem',
  borderRadius: '5px',
  cursor: 'pointer'
};

const deleteStyle = {
  ...btnStyle,
  backgroundColor: '#f44336',
  color: '#fff'
};