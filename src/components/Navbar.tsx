import { Link } from "react-router-dom";

export default function Navbar() {
  const isAdmin = localStorage.getItem("role") === "admin";

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl text-purple-300">VestiFy</Link>
      <div className="flex gap-4">
        <Link to="/cart">Carrinho</Link>
        <Link to="/orders">Pedidos</Link>
        <Link to="/profile">Perfil</Link>
        {isAdmin && (
          <>
            <Link to="/admin">Admin</Link>
            <Link to="/admin/products">Produtos</Link>
            <Link to="/admin/orders">Pedidos</Link>
          </>
        )}
        <Link to="/login">Sair</Link>
      </div>
    </nav>
  );
}
