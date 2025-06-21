import React, { useState } from 'react';
import { Bell, X } from 'lucide-react';
import { useSelector } from 'react-redux';

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.token.isAuthenticated);

  const notifications = [
    {
      id: 1,
      title: 'New job match',
      message: 'A new Frontend Developer position matches your profile',
      time: '2 hours ago',
      unread: true
    },
    {
      id: 2,
      title: 'Application update',
      message: 'Your application for Senior Developer has been viewed',
      time: '1 day ago',
      unread: false
    }
  ];

  const handleClick = () => {
    if (!isAuthenticated) {
      // Trigger auth modal
      return;
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        <Bell className="w-5 h-5" />
        {notifications.some(n => n.unread) && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Notifications</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.map(notification => (
              <div
                key={notification.id}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                  notification.unread ? 'bg-teal-50' : ''
                }`}
              >
                <div className="flex items-start">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{notification.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                  </div>
                  {notification.unread && (
                    <span className="w-2 h-2 bg-teal-500 rounded-full mt-2" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-100">
            <button className="text-sm text-teal-600 hover:text-teal-800 font-medium">
              Mark all as read
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;