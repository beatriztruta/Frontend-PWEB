import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

export default function Purchases() {
  const { userEmail, token } = useContext(AuthContext);
  const [compras, setCompras] = useState([]);
  const [erro, setErro] = useState('');
  const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        if (!token) {
          setErro('Usuário não autenticado.');
          return;
        }

        const comprasRes = await axios.get(`${BACKEND_BASE_URL}/api/purchases`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const comprasFormatadas = comprasRes.data.map((compra) => ({
          id: compra.id,
          total: compra.precoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
          data: new Date(compra.data).toLocaleDateString('pt-BR'),
          formaPagamento: compra.formaPagamento,
          itens: compra.cart.cartProducts.map(cp => ({
            nome: cp.product.nome,
            precoUnitario: cp.product.preco,
            quantidade: cp.quantidade,
            subtotal: (cp.product.preco * cp.quantidade).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })
          }))
        }));

        setCompras(comprasFormatadas);
      } catch (err) {
        console.error(err);
        setErro('Erro ao carregar as compras.');
      }
    };

    fetchCompras();
  }, [userEmail]);

  return (
    <div style={{ padding: '2rem', backgroundColor: '#b3ecff', minHeight: '100vh' }}>
      <h2 style={{ color: '#000'}}>Minhas Compras</h2>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {compras.map(c => (
          <div key={c.id} style={{
            backgroundColor: '#fff',
            color: '#000',
            padding: '1rem',
            borderRadius: '10px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            width: '300px'
          }}>
            <p><strong>Total:</strong> {c.total}</p>
            <p><strong>Data:</strong> {c.data}</p>
            <p><strong>Forma de Pagamento:</strong> {c.formaPagamento}</p>
            <hr />
            <p><strong>Itens:</strong></p>
            <ul>
              {c.itens.map((item, idx) => (
                <li key={idx}>
                  {item.nome} - {item.quantidade}x R$ {item.precoUnitario.toFixed(2).replace('.', ',')} = {item.subtotal}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}