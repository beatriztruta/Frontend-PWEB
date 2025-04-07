import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

export default function AdminUsers() {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [erro, setErro] = useState('');
  const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${BACKEND_BASE_URL}/api/users`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(res.data);
      } catch (err) {
        console.error(err);
        setErro('Erro ao carregar os usuários.');
      }
    };

    fetchUsers();
  }, []);

  return (
    <div style={{ padding: '2rem', backgroundColor: '#e0f2f1', minHeight: '100vh' }}>
      <h2>Usuários Cadastrados</h2>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.map(user => (
          <li key={user.id} style={{
            backgroundColor: '#fff',
            marginBottom: '1rem',
            padding: '1rem',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <p><strong>Nome:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Admin:</strong> {user.admin ? 'Sim' : 'Não'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

export default function AdminUsers() {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [erro, setErro] = useState('');
  const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${BACKEND_BASE_URL}/api/users`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(res.data);
      } catch (err) {
        console.error(err);
        setErro('Erro ao carregar os usuários.');
      }
    };

    fetchUsers();
  }, []);

  return (
    <div style={{ padding: '2rem', backgroundColor: '#e0f2f1', minHeight: '100vh' }}>
      <h2>Usuários Cadastrados</h2>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.map(user => (
          <li key={user.id} style={{
            backgroundColor: '#fff',
            marginBottom: '1rem',
            padding: '1rem',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <p><strong>Nome:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Admin:</strong> {user.admin ? 'Sim' : 'Não'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
