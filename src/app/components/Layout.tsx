import { Outlet } from 'react-router';
import { BottomNav } from './BottomNav';
import { Toaster } from './ui/sonner';

export function Layout() {
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative">
      <Outlet />
      <BottomNav />
      <Toaster />
    </div>
  );
}
