import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLayout({ children }) {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#121212', color: '#fff', minHeight: '100vh', padding: '1rem' }}>
      <header style={{ marginBottom: '1rem' }}>
        <h1>Painel do Administrador ⚙️</h1>
        <nav style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button onClick={() => navigate('/admin/products')} style={linkButtonStyle}>Produtos</button>
          <button onClick={() => navigate('/admin/users')} style={linkButtonStyle}>Usuários</button>
          <button onClick={() => navigate('/admin/carts')} style={linkButtonStyle}>Carrinhos</button>
          <button onClick={() => navigate('/admin/purchases')} style={linkButtonStyle}>Compras</button>
          <button onClick={() => navigate('/')} style={{ ...linkButtonStyle, color: 'salmon' }}>Sair</button>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}

const linkButtonStyle = {
  background: 'none',
  border: 'none',
  color: '#fff',
  fontWeight: 'bold',
  cursor: 'pointer',
  textDecoration: 'none',
  padding: 0
};