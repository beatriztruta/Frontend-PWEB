import React from 'react';

export default function AdminLayout({ children }) {
  return (
    <div style={{ backgroundColor: '#121212', color: '#fff', minHeight: '100vh', padding: '1rem' }}>
      <header style={{ marginBottom: '1rem' }}>
        <h1>Painel do Administrador ⚙️</h1>
        <nav style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <a href="/admin/products" style={linkStyle}>Produtos</a>
          <a href="/admin/users" style={linkStyle}>Usuários</a>
          <a href="/admin/carts" style={linkStyle}>Carrinhos</a>
          <a href="/admin/purchases" style={linkStyle}>Compras</a>
          <a href="/" style={{ ...linkStyle, color: 'salmon' }}>Sair</a>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}

const linkStyle = {
  color: '#fff',
  fontWeight: 'bold',
  textDecoration: 'none'
};
