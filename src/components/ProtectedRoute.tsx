import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuth();

  // If no user exists in context, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user exists, show children (the protected page)
  return <>{children}</>;
}
