import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

export default function AdminCarts() {
  const { token } = useContext(AuthContext);
  const [carts, setCarts] = useState([]);
  const [erro, setErro] = useState("");
  const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

  const fetchCartDetails = async () => {
    try {
      const cartsRes = await axios.get(`${BACKEND_BASE_URL}/api/carts`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const cartsData = await Promise.all(
        cartsRes.data.map(async (cart) => {
          const [cartDetailsRes, userRes] = await Promise.all([
            axios.get(`${BACKEND_BASE_URL}/api/carts/${cart.id}`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${BACKEND_BASE_URL}/api/users/${cart.userId}`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);

          const cartDetails = cartDetailsRes.data;
          const user = userRes.data;

          const productsDetailed = await Promise.all(
            cartDetails.cartProducts.map(async (cp) => {
              const productRes = await axios.get(`${BACKEND_BASE_URL}/api/products/${cp.productId}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              const product = productRes.data;
              return {
                nome: product.nome,
                quantidade: cp.quantidade,
                preco: product.preco,
                subtotal: product.preco * cp.quantidade,
              };
            })
          );

          const total = productsDetailed.reduce((acc, p) => acc + p.subtotal, 0);

          return {
            id: cart.id,
            isOpen: cartDetails.isOpen,
            usuario: user.name,
            itens: productsDetailed,
            total,
          };
        })
      );

      setCarts(cartsData);
    } catch (err) {
      console.error(err);
      setErro("Erro ao carregar os carrinhos.");
    }
  };

  const deletarCarrinho = async (cartId) => {
    try {
      await axios.delete(`${BACKEND_BASE_URL}/api/carts/${cartId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCartDetails();
    } catch (err) {
      console.error(err);
      alert("Erro ao deletar carrinho.");
    }
  };

  const fecharCarrinho = async (cartId) => {
    try {
      await axios.put(`${BACKEND_BASE_URL}/api/carts/close/${cartId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCartDetails();
    } catch (err) {
      console.error(err);
      alert("Erro ao fechar carrinho.");
    }
  };

  useEffect(() => {
    fetchCartDetails();
  }, []);

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f0f4c3", minHeight: "100vh" }}>
      <h2 style={{ color: '#000'}}>Carrinhos dos Usuários</h2>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {carts.map((c) => (
          <div key={c.id} style={{
            backgroundColor: "#fff",
            color: '#000',
            padding: "1rem",
            borderRadius: "10px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            width: "300px"
          }}>
            <p><strong>ID Carrinho:</strong> {c.id}</p>
            <p><strong>Usuário:</strong> {c.usuario}</p>
            <p><strong>Status:</strong> {c.isOpen ? "Aberto" : "Fechado"}</p>
            <p><strong>Itens:</strong></p>
            <ul>
              {c.itens.map((item, idx) => (
                <li key={idx}>
                  {item.nome} - {item.quantidade}x R$ {item.preco.toFixed(2).replace(".", ",")} = R$ {item.subtotal.toFixed(2).replace(".", ",")}
                </li>
              ))}
            </ul>
            <p><strong>Total:</strong> R$ {c.total.toFixed(2).replace(".", ",")}</p>
            <button
              onClick={() => deletarCarrinho(c.id)}
              style={{
                backgroundColor: "#f44336",
                color: "#fff",
                border: "none",
                padding: "0.5rem",
                width: "100%",
                borderRadius: "5px",
                cursor: "pointer",
                marginBottom: "0.5rem"
              }}
            >
              Deletar carrinho
            </button>
            {c.isOpen && (
              <button
                onClick={() => fecharCarrinho(c.id)}
                style={{
                  backgroundColor: "#4caf50",
                  color: "#fff",
                  border: "none",
                  padding: "0.5rem",
                  width: "100%",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Fechar carrinho
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
