import React from 'react';
import { useNotification } from '../context/NotificationContext';

const NotificationCenter = () => {
  const { notifications, dismissNotification } = useNotification();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-50 w-80 space-y-3">
      {notifications.map((notification) => (
        <div 
          key={notification.id}
          className={`p-4 rounded-md shadow-lg border-l-4 ${
            notification.type === 'success' ? 'bg-green-50 border-green-500' :
            notification.type === 'error' ? 'bg-red-50 border-red-500' :
            notification.type === 'warning' ? 'bg-yellow-50 border-yellow-500' :
            'bg-blue-50 border-blue-500'
          } transition-all duration-300 ease-in-out`}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              {notification.title && (
                <h3 className="font-semibold text-gray-800">{notification.title}</h3>
              )}
              <p className="text-sm text-gray-600">{notification.message}</p>
              
              {notification.action && (
                <button 
                  onClick={notification.action.onClick}
                  className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  {notification.action.label}
                </button>
              )}
            </div>
            <button 
              onClick={() => dismissNotification(notification.id)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationCenter;