import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

export default function AdminProducts() {
  const { token } = useContext(AuthContext);
  const [produtos, setProdutos] = useState([]);
  const [erro, setErro] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [novoProduto, setNovoProduto] = useState({
    nome: '',
    cor: '',
    tipo: '',
    caimento: 'Regular',
    material: '',
    tamanho: 'M',
    preco: '',
  });

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

  const handleCadastro = async () => {
    try {
      await axios.post(`${BACKEND_BASE_URL}/api/products`, novoProduto, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowModal(false);
      fetchProdutos();
      setNovoProduto({
        nome: '',
        cor: '',
        tipo: '',
        caimento: 'Regular',
        material: '',
        tamanho: 'M',
        preco: '',
      });
    } catch (err) {
      console.error(err);
      alert('Erro ao cadastrar produto.');
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f3e5f5', minHeight: '100vh' }}>
      <h2 style={{ color: '#000'}}>Gerenciar Produtos</h2>
      <button
        onClick={() => setShowModal(true)}
        style={{
          marginBottom: '1rem',
          backgroundColor: '#4caf50',
          color: '#fff',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Cadastrar produto
      </button>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {produtos.map(produto => (
          <div key={produto.id} style={{
            backgroundColor: '#fff',
            color: '#000',
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

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#fff',
            padding: '2rem',
            borderRadius: '10px',
            width: '400px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
          }}>
            <h3>Novo Produto</h3>
            <input placeholder="Nome" value={novoProduto.nome} onChange={e => setNovoProduto({ ...novoProduto, nome: e.target.value })} style={inputStyle} />
            <input placeholder="Cor" value={novoProduto.cor} onChange={e => setNovoProduto({ ...novoProduto, cor: e.target.value })} style={inputStyle} />
            <input placeholder="Tipo" value={novoProduto.tipo} onChange={e => setNovoProduto({ ...novoProduto, tipo: e.target.value })} style={inputStyle} />
            <select value={novoProduto.caimento} onChange={e => setNovoProduto({ ...novoProduto, caimento: e.target.value })} style={inputStyle}>
              {['Fit', 'Slim', 'SlimFit', 'Regular', 'Oversized', 'Baggy', 'Reta'].map(op => (
                <option key={op} value={op}>{op}</option>
              ))}
            </select>
            <input placeholder="Material" value={novoProduto.material} onChange={e => setNovoProduto({ ...novoProduto, material: e.target.value })} style={inputStyle} />
            <select value={novoProduto.tamanho} onChange={e => setNovoProduto({ ...novoProduto, tamanho: e.target.value })} style={inputStyle}>
              {['PP', 'P', 'M', 'G', 'GG'].map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <input
              placeholder="Preço"
              type="number"
              value={novoProduto.preco}
              onChange={e => setNovoProduto({ ...novoProduto, preco: parseFloat(e.target.value) })}
              style={inputStyle}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={handleCadastro} style={buttonStyle}>Cadastrar</button>
              <button onClick={() => setShowModal(false)} style={{ ...buttonStyle, backgroundColor: '#ccc' }}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.5rem',
  marginBottom: '1rem',
  borderRadius: '5px',
  border: '1px solid #ccc'
};

const buttonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#4caf50',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold'
};