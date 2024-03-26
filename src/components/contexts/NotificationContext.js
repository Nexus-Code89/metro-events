import React, { createContext, useState, useEffect } from 'react';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const notifs_test = [
        {
          id: '1',
          data: {
            title: "Your new event is coming up!",
            event: "Event Name",
            message: 'This is a test message for the notification.',
            timestamp: "1 day ago",
            read: false
          }
        },
        {
          id: '2',
          data: {
            title: "Another Notification",
            event: "Another Event",
            timestamp: "8 hours ago",
            message: 'This is a test message for the notification.',
            read: true
          }
        },
      ];

  const [notifications, setNotifications] = useState(notifs_test);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const count = notifications.filter(notification => !notification.data.read).length;
    setUnreadCount(count);
  }, [notifications]);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications, unreadCount }}>
      {children}
    </NotificationContext.Provider>
  );
};