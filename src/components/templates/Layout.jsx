import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import NavBar from '../organisms/NavBar/NavBar';

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    const currentPath = location.pathname;

    if (user) {
      // Si hay usuario y está en login o register, ir a gallery
      if (currentPath === '/login' || currentPath === '/register') {
        navigate('/gallery', { replace: true });
      }
    } else {
      // Si no hay usuario y no está en login o register, ir a login
      if (currentPath !== '/login' && currentPath !== '/register') {
        navigate('/login', { replace: true });
      }
    }
  }, [navigate, location]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
    </div>
  );
}
