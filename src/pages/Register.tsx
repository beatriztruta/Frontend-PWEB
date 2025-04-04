import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/auth/register", {
        nome,
        email,
        senha,
      });
      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (err) {
      alert("Erro ao cadastrar");
    }
  };

  return (
    <div className="container">
      <h1 >Criar conta</h1>
      <form  onSubmit={handleRegister}>
        <input
          
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button  type="submit">
          Cadastrar
        </button>
      </form>
    </div>
  );
}
