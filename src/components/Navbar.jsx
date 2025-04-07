import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{
      backgroundColor: '#000',
      color: '#fff',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h2 style={{ margin: 0 }}>⚙️ QAPI</h2>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/home" style={linkStyle}>Produtos</Link>
        <Link to="/cart" style={linkStyle}>Carrinho</Link>
        <Link to="/purchases" style={linkStyle}>Compras</Link>
        <Link to="/profile" style={linkStyle}>Perfil</Link>
        <Link to="/" style={linkStyle}>Sair</Link>
      </div>
    </nav>
  );
}

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontWeight: 'bold'
};