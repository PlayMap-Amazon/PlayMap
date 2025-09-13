import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();
const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4242/api';


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const fetchProfile = async () => {
      try {
        const profile = await fetch('https://subtle-chimp-equally.ngrok-free.app/profile', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
        });

        if (profile.ok) {
          const data = await profile.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const register = async (data) => {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const result = await res.json();
        console.log('Setting user:', result.user);
        setUser(result.user);
        return result.user;
      }

      setUser(null);
      return null;
    } catch (error) {
      console.error('Fetch failed:', error.message || error);
    }
  };
  
  const login = async (data) => {
    try {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': 'true',
            },
            body: JSON.stringify(data),
        });

        if (res.ok) {
          const result = await res.json();
          console.log('Setting user:', result.user);
          
          setUser(result.user);
          return result.user;
        } else {
          setUser(null);
          return null;
        }
    } catch (error) {
        console.error('Fetch failed:', error.message || error);
    }
  };

  const logout = async () => {
    await fetch(`${API_BASE}/auth/logout`, {
      method: 'POST',
      headers: {
        'ngrok-skip-browser-warning': 'true'
      },
      credentials: 'include'

    });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
