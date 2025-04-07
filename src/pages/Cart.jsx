import React from 'react';

export default function Cart() {
  return (
    <div style={{ padding: '2rem', backgroundColor: '#b3ecff', minHeight: '100vh' }}>
      <h2 style={{ marginBottom: '1rem' }}>Carrinho</h2>
      <div style={{
        backgroundColor: '#fff',
        padding: '1rem',
        borderRadius: '10px',
        width: '300px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
      }}>
        <p>Item: Camiseta Básica</p>
        <p>Quantidade: 2</p>
        <p>Total: R$ 79,98</p>
        <button style={{
          backgroundColor: '#ffeb3b',
          border: 'none',
          padding: '0.5rem',
          width: '100%',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>Finalizar Pedido</button>
      </div>
    </div>
  );
}