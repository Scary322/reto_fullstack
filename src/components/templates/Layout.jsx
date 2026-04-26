import { Outlet } from 'react-router-dom';
import NavBar from '../organisms/NavBar/NavBar';

export default function Layout() {
  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
    </div>
  );
}
