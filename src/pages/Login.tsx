import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        email,
        senha,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user?.role || "user");
      navigate("/");
    } catch (err) {
      alert("Erro ao logar");
    }
  };

  return (
    <div className="container">
      <h1 >VestiFy - Login</h1>
      <form  onSubmit={handleLogin}>
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
          Entrar
        </button>
      </form>
    </div>
  );
}
