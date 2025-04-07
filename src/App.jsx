import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Purchases from './pages/Purchases';
import AdminProducts from './pages/AdminProducts';
import AdminUsers from './pages/AdminUsers';
import AdminPurchases from './pages/AdminPurchases';
import AdminCarts from './pages/AdminCarts';
import Navbar from './components/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import AdminLayout from './layouts/AdminLayout';

function LayoutWrapper({ children }) {
  const location = useLocation();
  const noNavbarRoutes = ['/', '/register'];
  const adminRoutes = ['/admin/products', '/admin/users', '/admin/purchases', '/admin/carts'];

  if (adminRoutes.includes(location.pathname)) {
    return <AdminLayout>{children}</AdminLayout>;
  }

  const hideNavbar = noNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <AuthProvider>
      <Router>
        <LayoutWrapper>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/purchases" element={<Purchases />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/purchases" element={<AdminPurchases />} />
            <Route path="/admin/carts" element={<AdminCarts />} />
          </Routes>
        </LayoutWrapper>
      </Router>
    </AuthProvider>
  );
}