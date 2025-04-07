import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const [erro, setErro] = useState('');
  const [cartId, setCartId] = useState('');
  const { userEmail, token } = useContext(AuthContext);
  const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const produtosResponse = await axios.get(`${BACKEND_BASE_URL}/api/products`);
        setProdutos(produtosResponse.data);

      } catch (err) {
        console.error(err);
        setErro('Erro ao carregar produtos.');
      }

      try {
        const userResponse = await axios.get(`${BACKEND_BASE_URL}/api/users/email/${userEmail}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userId = userResponse.data.id;

        const cartResponse = await axios.get(`${BACKEND_BASE_URL}/api/carts/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartId(cartResponse.data.id);
      } catch (err) {
        console.error(err)
        setCartId("");
      }
    };

    fetchData();
  }, [userEmail]);

  const adicionarAoCarrinho = async (productId) => {
    if (!cartId) return;

    try {
      await axios.put(`${BACKEND_BASE_URL}/api/carts/product/add`, {
        cartId,
        productId,
        quantidade: 1,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Produto adicionado ao carrinho!');
    } catch (err) {
      console.error(err);
      alert('Erro ao adicionar produto ao carrinho.');
    }
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#b3ecff', minHeight: '100vh' }}>
      <h2 style={{ marginBottom: '1rem' }}>Produtos</h2>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {produtos.map((produto) => (
          <div key={produto.id} style={{
            backgroundColor: '#fff',
            padding: '1rem',
            borderRadius: '10px',
            width: '200px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}>
            <h4>{produto.nome}</h4>
            <p>{`R$ ${produto.preco.toFixed(2).replace('.', ',')}`}</p>
            <button
              onClick={() => adicionarAoCarrinho(produto.id)}
              style={{
                backgroundColor: '#ffeb3b',
                border: 'none',
                padding: '0.5rem',
                width: '100%',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Adicionar ao carrinho
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}