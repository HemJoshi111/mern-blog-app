import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Loader from './Loader';

const ProtectedRoute = () => {
  const { user, token } = useAuth();
  
  // Note: In a real app, you might also have a 'loading' state
  // from when the context is first checking localStorage.
  // For this example, we'll just check for user and token.

  if (!user || !token) {
    // If user is not logged in, redirect to the /login page
    // 'replace' stops the user from using the back button to go
    // back to the protected route they were trying to access.
    return <Navigate to="/login" replace />;
  }

  // If user is logged in, render the child route
  // <Outlet /> is a placeholder for the nested route component
  // (e.g., <DashboardPage />, <CreatePostPage />)
  return <Outlet />;
};

export default ProtectedRoute;