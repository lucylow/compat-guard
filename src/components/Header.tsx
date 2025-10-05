import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, User, Settings, LogOut, Mail } from 'lucide-react';
import { ProjectSelector } from './ProjectSelector';

interface HeaderProps {
  onSearch?: (query: string) => void;
  currentProjectId?: string;
  onProjectChange?: (projectId: string) => void;
}

export const Header = ({ onSearch, currentProjectId, onProjectChange }: HeaderProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, title: 'New compatibility issue detected', message: 'CSS Subgrid usage in ProductGrid.tsx', time: '5 min ago', unread: true },
    { id: 2, title: 'Scan completed', message: 'TechShop Pro: 3 issues found', time: '1 hour ago', unread: true },
    { id: 3, title: 'Compliance score improved', message: 'Dashboard project: 66.1% → 68.2%', time: '2 hours ago', unread: false },
    { id: 4, title: 'Migration suggestion', message: 'AI suggests safer alternative for array.flatMap', time: '1 day ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="bg-card border-b border-border px-4 md:px-6 py-4 flex flex-wrap justify-between items-center shadow-sm w-full">
      {/* Project Selector & Breadcrumb */}
      <div className="flex items-center gap-4 min-w-0">
        {currentProjectId && onProjectChange && (
          <ProjectSelector
            currentProjectId={currentProjectId}
            onProjectChange={onProjectChange}
          />
        )}
        {!currentProjectId && (
          <nav className="flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <a href="#" className="hover:text-foreground transition-colors" tabIndex={0}>Projects</a>
            <span>/</span>
            <a href="#" className="hover:text-foreground transition-colors" tabIndex={0}>E-Commerce Platform</a>
            <span>/</span>
            <span className="text-foreground font-medium">Dashboard</span>
          </nav>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 min-w-0">
        {/* Search */}
        <div className="relative flex-1 min-w-[180px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search projects, issues..."
            className="pl-10 pr-4 py-2 w-full border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
            onChange={(e) => onSearch?.(e.target.value)}
            aria-label="Search"
          />
        </div>

        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground relative"
            aria-label="Notifications"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
              </div>
              <div className="divide-y divide-border">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-muted/50 transition-colors cursor-pointer ${
                      notification.unread ? 'bg-primary/5' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {notification.unread && (
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{notification.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-border text-center">
                <button className="text-sm text-primary hover:underline">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            className="flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="User menu"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-sm flex-shrink-0">
              JD
            </div>
            <span className="text-sm font-medium hidden md:block">John Developer</span>
          </button>

          {/* User Dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-lg z-50">
              <div className="p-4 border-b border-border">
                <p className="font-semibold text-foreground">John Developer</p>
                <p className="text-xs text-muted-foreground mt-1">john.dev@compatguard.com</p>
              </div>
              <div className="py-2">
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center gap-3">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span>Profile</span>
                </button>
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center gap-3">
                  <Settings className="w-4 h-4 text-muted-foreground" />
                  <span>Settings</span>
                </button>
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>Messages</span>
                </button>
              </div>
              <div className="border-t border-border py-2">
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center gap-3 text-red-500">
                  <LogOut className="w-4 h-4" />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
