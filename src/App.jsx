import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import { useContext } from 'react';

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
import AdminLayout from './layouts/AdminLayout';

function LayoutWrapper({ children }) {
  const location = useLocation();
  const { userData } = useContext(AuthContext);

  const noNavbarRoutes = ['/', '/register'];

  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return userData?.admin ? (
      <AdminLayout>{children}</AdminLayout>
    ) : (
      <Navigate to="/home" />
    );
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