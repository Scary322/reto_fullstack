import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { subscribeToAuthChanges, logoutUser } from '../../../firebase/auth';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /* 
      // BACKUP: OLD LOCALSTORAGE METHOD
      // const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
      // setUser(loggedInUser);
      // setLoading(false);
    */

    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      /*
        // BACKUP: OLD LOCALSTORAGE METHOD
        // localStorage.removeItem('loggedInUser');
      */
      navigate('/login');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-brand-blue)]"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <p className="text-xl text-secondary">Please log in to view your profile</p>
        <button 
          onClick={() => navigate('/login')}
          className="btn-dna px-6 py-2 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const displayName = user.name || user.email?.split('@')[0] || 'User';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="card-bg shadow-lg rounded-2xl overflow-hidden">
        {/* Header/Cover background */}
        <div className="h-32 bg-gradient-to-r from-[var(--color-brand-blue)] via-[var(--color-accent)] to-red-500"></div>
        
        <div className="flex flex-col sm:flex-row items-center sm:items-start px-6 -mt-12 pb-6">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-[var(--color-bg)] p-1 shadow-md">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-[var(--color-bg)] to-[var(--color-bg)] flex items-center justify-center text-3xl font-bold text-secondary">
              {displayName.charAt(0).toUpperCase()}
            </div>
          </div>
          
          {/* User Info */}
          <div className="mt-4 sm:mt-14 sm:ml-6 text-center sm:text-left flex-1">
            <h1 className="text-2xl font-bold text-primary">
              {displayName}
            </h1>
            <p className="text-sm text-secondary mt-1">{user.email}</p>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 sm:mt-14">
            <button
              onClick={handleLogout}
              className="px-6 py-2 border-2 border-red-500 text-red-500 font-medium rounded-lg hover:bg-red-50 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>

        {/* Profile Details Sections */}
        <div className="border-t border-brand p-6">
          <h3 className="text-lg font-semibold text-primary mb-4">Account Information</h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-secondary">User ID</dt>
              <dd className="mt-1 text-sm text-primary break-all">{user.id}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-secondary">Account status</dt>
              <dd className="mt-1 text-sm text-green-600 font-medium">Active</dd>
            </div>
            {/* Add more info later if available connected logic */}
            <div className="sm:col-span-2">
               <dt className="text-sm font-medium text-secondary">Email Verified</dt>
               <dd className="mt-1 text-sm text-primary">No</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
