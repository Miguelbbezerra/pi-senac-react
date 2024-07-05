// PrivateRoute.tsx
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { validateToken } from './tokenValidate';
import { GetItemLocalStorage } from '../../helper/localStorage';

interface PrivateRouteProps {
  redirectTo: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ redirectTo }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = GetItemLocalStorage('token');
      if (token) {
        const valid = await validateToken(token);
        setIsAuthenticated(valid);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkToken();
  }, []);

  if (isAuthenticated === null) {
    // Mostra um carregando enquanto verifica o token
    return <div>Loading...</div>;
  }

  return !isAuthenticated ? <Navigate to={redirectTo} /> : <Outlet />;
};

export default PrivateRoute;
