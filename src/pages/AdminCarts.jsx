import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

export default function AdminCarts() {
  const { token } = useContext(AuthContext);
  const [carts, setCarts] = useState([]);
  const [erro, setErro] = useState("");
  const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const res = await axios.get(`${BACKEND_BASE_URL}/api/carts`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const formatados = res.data.map((cart) => ({
          id: cart.id,
          fechado: cart.fechado ? "Sim" : "Não",
          usuario: cart.user?.nome || "Desconhecido",
          itens: cart.cartProducts.map((cp) => ({
            nome: cp.product.nome,
            quantidade: cp.quantidade,
            preco: cp.product.preco,
            subtotal: cp.product.preco * cp.quantidade,
          }))
        }));

        setCarts(formatados);
      } catch (err) {
        console.error(err);
        setErro("Erro ao carregar os carrinhos.");
      }
    };

    fetchCarts();
  }, []);

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f0f4c3", minHeight: "100vh" }}>
      <h2>Carrinhos dos Usuários</h2>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {carts.map((c) => (
          <div key={c.id} style={{
            backgroundColor: "#fff",
            padding: "1rem",
            borderRadius: "10px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            width: "300px"
          }}>
            <p><strong>ID Carrinho:</strong> {c.id}</p>
            <p><strong>Usuário:</strong> {c.usuario}</p>
            <p><strong>Fechado:</strong> {c.fechado}</p>
            <p><strong>Itens:</strong></p>
            <ul>
              {c.itens.map((item, idx) => (
                <li key={idx}>
                  {item.nome} - {item.quantidade}x R$ {item.preco.toFixed(2).replace(".", ",")} = R$ {item.subtotal.toFixed(2).replace(".", ",")}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
