import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

export default function Cart() {
  const [cartProducts, setCartProducts] = useState([]);
  const [cartId, setCartId] = useState('');
  const [erro, setErro] = useState('');
  const { userEmail, token } = useContext(AuthContext);
  const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (!token) {
          setErro('Usuário não autenticado.');
          return;
        }
  
        const userResponse = await axios.get(`${BACKEND_BASE_URL}/api/users/email/${userEmail}`, {
          headers: { Authorization: `Bearer ${token}`, }
        });
        const userId = userResponse.data.id;
  
        const cartRes = await axios.get(`${BACKEND_BASE_URL}/api/carts/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
  
        const cart = cartRes.data;
        setCartId(cart.id);
  
        const cartProductsWithInfo = await Promise.all(
          cart.cartProducts.map(async (item) => {
            const produtoRes = await axios.get(`${BACKEND_BASE_URL}/api/products/${item.productId}`);
            const produto = produtoRes.data;
  
            return {
              id: item.id,
              productId: item.productId,
              nome: produto.nome,
              precoUnitario: produto.preco,
              quantidade: item.quantidade,
              total: produto.preco * item.quantidade
            };
          })
        );
  
        setCartProducts(cartProductsWithInfo);
      } catch (err) {
        console.error(err);
        setErro('Erro ao carregar o carrinho.');
      }
    };
  
    fetchCart();
  }, [userEmail]);  

  const atualizarQuantidade = async (productId, delta) => {
    try {
      const url = `${BACKEND_BASE_URL}/api/carts/product/${delta > 0 ? 'add' : 'rmv'}`;
      const method = delta > 0 ? 'put' : 'delete';

      await axios({
        method,
        url,
        data: {
          cartId,
          productId,
          quantidade: 1,
        },
        headers: { Authorization: `Bearer ${token}` },
      });

      const updated = cartProducts.map(prod => {
        if (prod.productId === productId) {
          return {
            ...prod,
            quantidade: prod.quantidade + delta,
            total: (prod.quantidade + delta) * prod.precoUnitario
          };
        }
        return prod;
      }).filter(prod => prod.quantidade > 0);

      setCartProducts(updated);
    } catch (err) {
      console.error(err);
      alert('Erro ao atualizar o carrinho.');
    }
  };

  const finalizarPedido = async () => {
    try {
      await axios.post(`${BACKEND_BASE_URL}/api/purchases`, {
        cartId,
        formaPagamento: 'Cartão de crédito',
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Pedido finalizado com sucesso!');
      setCartProducts([]);
    } catch (err) {
      console.error(err);
      alert('Erro ao finalizar o pedido.');
    }
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#b3ecff', minHeight: '100vh' }}>
      <h2 style={{ marginBottom: '1rem' }}>Carrinho</h2>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      {cartProducts.map(prod => (
        <div key={prod.id} style={{
          backgroundColor: '#fff',
          padding: '1rem',
          borderRadius: '10px',
          width: '300px',
          marginBottom: '1rem',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
        }}>
          <p><strong>Item:</strong> {prod.nome}</p>
          <p><strong>Quantidade:</strong> {prod.quantidade}</p>
          <p><strong>Preço:</strong> R$ {prod.total.toFixed(2).replace('.', ',')}</p>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            <button
              onClick={() => atualizarQuantidade(prod.productId, -1)}
              style={botaoStyle}
            >-</button>
            <button
              onClick={() => atualizarQuantidade(prod.productId, 1)}
              style={botaoStyle}
            >+</button>
          </div>
        </div>
      ))}
      {cartProducts.length > 0 && (
        <button onClick={finalizarPedido} style={{
          backgroundColor: '#ffeb3b',
          border: 'none',
          padding: '0.75rem',
          width: '300px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}>
          Finalizar Pedido
        </button>
      )}
    </div>
  );
}

const botaoStyle = {
  backgroundColor: '#ffeb3b',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold'
};