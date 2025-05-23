import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { ...notification, id }]);
    
    // Auto-dismiss after timeout if autoClose is true
    if (notification.autoClose !== false) {
      const timeout = notification.timeout || 5000;
      setTimeout(() => {
        dismissNotification(id);
      }, timeout);
    }
    
    return id;
  };

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ 
      notifications, 
      addNotification, 
      dismissNotification 
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);