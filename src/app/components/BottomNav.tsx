import { Link, useLocation } from 'react-router';
import { Trees, Trophy, User, Plus } from 'lucide-react';

export function BottomNav() {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Trees, label: 'Trees' },
    { path: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
    { path: '/add', icon: Plus, label: 'Add' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-inset-bottom z-50">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 h-full ${
                isActive ? 'text-green-600' : 'text-gray-500'
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'fill-green-600' : ''}`} />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
