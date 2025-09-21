import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Assuming this is the correct path to your hook

export const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    // You can show a loading spinner or screen here while auth state is being determined
    return <div className='text-center text-2xl flex justify-center items-center h-screen'>Loading...</div>;
  }

  // If the user is logged in, render the child routes using <Outlet />
  if (user) {
    return <Outlet />;
  }
  
  // If the user is not logged in, redirect them to the authentication page
  return <Navigate to="/auth" replace />;
};
