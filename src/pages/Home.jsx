import React from 'react';

const produtos = [
  { id: 1, nome: "Camiseta Básica", preco: "R$ 39,99" },
  { id: 2, nome: "Camiseta Premium", preco: "R$ 49,99" },
  { id: 3, nome: "Camiseta Clássica", preco: "R$ 45,00" },
];

export default function Home() {
  return (
    <div style={{ padding: '2rem', backgroundColor: '#b3ecff', minHeight: '100vh' }}>
      <h2 style={{ marginBottom: '1rem' }}>Produtos</h2>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {produtos.map(produto => (
          <div key={produto.id} style={{
            backgroundColor: '#fff',
            padding: '1rem',
            borderRadius: '10px',
            width: '200px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}>
            <h4>{produto.nome}</h4>
            <p>{produto.preco}</p>
            <button style={{
              backgroundColor: '#ffeb3b',
              border: 'none',
              padding: '0.5rem',
              width: '100%',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}>Adicionar ao carrinho</button>
          </div>
        ))}
      </div>
    </div>
  );
}