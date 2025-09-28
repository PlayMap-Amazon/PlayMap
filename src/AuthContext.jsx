import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await fetch(`${url}/profile`, {
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
  }, [url]);

  const register = async (data) => {
    try {
        data.username = "TempUser";
        const res = await fetch(`${url}/auth/register`, {
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
            setUser(result);
            return result;
        }
        setUser(null);

        return null;
    } catch (error) {
        console.error('Fetch failed:', error.message || error);
    }
  }
  
  const login = async (data) => {
    try {
        const res = await fetch(`${url}/auth/login`, {
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
            setUser(result);
            return result;
        } else {
            setUser(null);
            return null;
        }
    } catch (error) {
        console.error('Fetch failed:', error.message || error);
    }
  };

  const logout = async () => {
    await fetch(`${url}/auth/logout`, {
      method: 'POST',
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
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
