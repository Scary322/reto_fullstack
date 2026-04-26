import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { subscribeToAuthChanges } from '../../../firebase/auth';
import useCartStore from '../../../store/cartStore';

export default function NavBar() {
  const location = useLocation();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const { getTotalItems, setUser } = useCartStore();
  const totalItems = getTotalItems();

  useEffect(() => {
    /*
      // BACKUP: OLD LOCALSTORAGE METHOD
      // const user = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
      // setLoggedInUser(user);
    */
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      setLoggedInUser(currentUser);
      // Actualizar el carrito para el usuario actual
      setUser(currentUser?.id || null);
    });

    return () => unsubscribe();
  }, [setUser]);

  const isActive = (path) => location.pathname === path;

  /*
    // BACKUP: OLD LOCALSTORAGE METHOD
    // const handleLogout = () => {
    //   localStorage.removeItem('loggedInUser');
    //   setLoggedInUser(null);
    //   navigate('/login');
    // };
  */

  return (
    <nav className="sticky top-0 z-50 bg-slate-800 border-b border-slate-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-2xl font-bold hover:opacity-80 transition-opacity text-slate-100"
          >
            <span className="bg-gradient-to-r from-[var(--color-brand-blue)] via-[var(--color-accent)] to-[var(--color-brand-blue)] bg-clip-text text-transparent">
              MyStore
            </span>
          </Link>

          {/* Navigation Links */}
          <ul className="hidden md:flex items-center space-x-8">
            <li>
              <Link
                to="/gallery"
                className={`text-base font-medium transition-all duration-300 pb-2 border-b-2 ${
                  isActive('/gallery')
                    ? 'text-[var(--color-brand-blue)] border-[var(--color-brand-blue)]'
                    : 'text-slate-300 border-transparent hover:text-slate-100 hover:border-[var(--color-brand-blue)]'
                }`}
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className={`relative text-base font-medium transition-all duration-300 pb-2 border-b-2 ${
                  isActive('/cart')
                    ? 'text-[var(--color-brand-blue)] border-[var(--color-brand-blue)]'
                    : 'text-slate-300 border-transparent hover:text-slate-100 hover:border-[var(--color-brand-blue)]'
                }`}
              >
                Carrito
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[var(--color-accent)] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </li>
            {loggedInUser ? (
              <li>
                <Link
                  to="/profile"
                  className={`text-base font-medium transition-all duration-300 pb-2 border-b-2 ${
                    isActive('/profile')
                      ? 'text-[var(--color-brand-blue)] border-[var(--color-brand-blue)]'
                      : 'text-slate-300 border-transparent hover:text-slate-100 hover:border-[var(--color-brand-blue)]'
                  }`}
                >
                  Profile
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className={`text-base font-medium transition-all duration-300 pb-2 border-b-2 ${
                      isActive('/login')
                        ? 'text-[var(--color-brand-blue)] border-[var(--color-brand-blue)]'
                        : 'text-slate-300 border-transparent hover:text-slate-100 hover:border-[var(--color-brand-blue)]'
                    }`}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className={`text-base font-medium transition-all duration-300 pb-2 border-b-2 ${
                      isActive('/register')
                        ? 'text-[var(--color-brand-blue)] border-[var(--color-brand-blue)]'
                        : 'text-slate-300 border-transparent hover:text-slate-100 hover:border-[var(--color-brand-blue)]'
                    }`}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Mobile Menu Button (opcional para futuro) */}
          <button className="md:hidden p-2 rounded-md text-secondary hover:bg-[var(--color-brand-border)]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
