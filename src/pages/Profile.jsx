import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

export default function Profile() {
  const { userEmail, token, setToken, setUserEmail } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await axios.get(`${BACKEND_BASE_URL}/api/users/email/${userEmail}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(userResponse.data);
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar perfil.');
      }
    };

    if (token && userEmail) {
      fetchUser();
    }
  }, [token, userEmail]);

  const handleLogout = () => {
    setToken(null);
    setUserEmail(null);
    navigate('/');
  };

  const openModal = () => {
    setFormData({
      name: userData.name,
      email: userData.email,
      password: ''
    });
    setModalOpen(true);
  };

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(formData);
    try {
      await axios.put(`${BACKEND_BASE_URL}/api/users/${userData.id}`, {
        ...formData,
        admin: false
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserData(prev => ({ ...prev, name: formData.name, email: formData.email }));
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      setError('Erro ao atualizar perfil.');
    }
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#b3ecff', minHeight: '100vh' }}>
      <h2>Perfil do Usuário</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {userData && (
        <>
          <p><strong>Nome:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <div style={{ marginTop: '1rem' }}>
            <button style={buttonStyle} onClick={openModal}>Editar Perfil</button>
            <button style={buttonStyleDanger} onClick={handleLogout}>Sair</button>
          </div>
        </>
      )}

      {modalOpen && (
        <div style={modalStyle}>
          <form onSubmit={handleSubmit} style={formStyle}>
            <h3>Editar Perfil</h3>
            <input
              type="text"
              name="name"
              placeholder="Nome"
              value={formData.name}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              type="password"
              name="password"
              placeholder="Nova Senha"
              value={formData.password}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <button type="submit" style={buttonStyle}>Salvar</button>
            <button type="button" style={buttonStyleDanger} onClick={() => setModalOpen(false)}>Cancelar</button>
          </form>
        </div>
      )}
    </div>
  );
}

const buttonStyle = {
  backgroundColor: '#ffeb3b',
  border: 'none',
  padding: '0.5rem 1rem',
  marginRight: '0.5rem',
  borderRadius: '5px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

const buttonStyleDanger = {
  ...buttonStyle,
  backgroundColor: '#f44336',
  color: '#fff'
};

const modalStyle = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.3)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const formStyle = {
  backgroundColor: '#fff',
  padding: '2rem',
  borderRadius: '10px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '300px'
};

const inputStyle = {
  padding: '0.5rem',
  borderRadius: '5px',
  border: '1px solid #ccc'
};