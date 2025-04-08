import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

export default function AdminProducts() {
  const { token } = useContext(AuthContext);
  const [produtos, setProdutos] = useState([]);
  const [erro, setErro] = useState('');
  const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

  const fetchProdutos = async () => {
    try {
      const res = await axios.get(`${BACKEND_BASE_URL}/api/products`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProdutos(res.data);
    } catch (err) {
      console.error(err);
      setErro('Erro ao carregar os produtos.');
    }
  };

  const removerProduto = async (id) => {
    try {
      await axios.delete(`${BACKEND_BASE_URL}/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProdutos();
    } catch (err) {
      console.error(err);
      alert('Erro ao remover produto.');
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f3e5f5', minHeight: '100vh' }}>
      <h2>Gerenciar Produtos</h2>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {produtos.map(produto => (
          <div key={produto.id} style={{
            backgroundColor: '#fff',
            padding: '1rem',
            borderRadius: '10px',
            width: '250px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}>
            <h4>{produto.nome}</h4>
            <p>{`R$ ${produto.preco.toFixed(2).replace('.', ',')}`}</p>
            <button
              onClick={() => removerProduto(produto.id)}
              style={{
                backgroundColor: '#f44336',
                color: '#fff',
                border: 'none',
                padding: '0.5rem',
                width: '100%',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Remover
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
