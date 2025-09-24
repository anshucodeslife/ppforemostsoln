import { useEffect, useState, type JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';

interface Props {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: Props) => {
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setAuthorized(false);
        return;
      }
      else{
        const isAdmin = await AuthService.isAdminUser();
      setAuthorized(isAdmin);
      }
    };

    checkAuth();
  }, []);

  if (authorized === null) {
    return <div>Loading...</div>;
  }

  return authorized ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
