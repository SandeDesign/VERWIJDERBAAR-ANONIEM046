import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Car, 
  Calendar, 
  Users, 
  Settings, 
  BarChart3, 
  FileText,
  Shield,
  X
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useAppStore } from '../../store/appStore';

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const { sidebarOpen, setSidebarOpen } = useAppStore();

  const customerNavItems = [
    { to: '/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/cars', icon: Car, label: 'Auto\'s' },
    { to: '/bookings', icon: Calendar, label: 'Mijn Boekingen' },
    { to: '/profile', icon: Users, label: 'Profiel' },
  ];

  const managerNavItems = [
    { to: '/manager', icon: Home, label: 'Dashboard' },
    { to: '/manager/cars', icon: Car, label: 'Auto Beheer' },
    { to: '/manager/bookings', icon: Calendar, label: 'Boekingen' },
    { to: '/manager/customers', icon: Users, label: 'Klanten' },
    { to: '/manager/reports', icon: BarChart3, label: 'Rapporten' },
  ];

  const adminNavItems = [
    { to: '/admin', icon: Home, label: 'Dashboard' },
    { to: '/admin/users', icon: Users, label: 'Gebruikers' },
    { to: '/admin/cars', icon: Car, label: 'Auto Beheer' },
    { to: '/admin/bookings', icon: Calendar, label: 'Alle Boekingen' },
    { to: '/admin/cms', icon: FileText, label: 'CMS' },
    { to: '/admin/settings', icon: Settings, label: 'Systeeminstellingen' },
    { to: '/admin/verification', icon: Shield, label: 'Verificaties' },
  ];

  const getNavItems = () => {
    switch (user?.role) {
      case 'customer':
        return customerNavItems;
      case 'manager':
        return managerNavItems;
      case 'admin':
        return adminNavItems;
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 lg:hidden">
          <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="px-4 py-6">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;