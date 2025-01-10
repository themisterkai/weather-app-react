import React, { createContext, useContext, useReducer } from 'react';

type NotificationState = string;

type NotificationAction =
  | { type: 'SET_NOTIFICATION'; message: string }
  | { type: 'CLEAR_NOTIFICATION' };

type NotificationContextType = [
  NotificationState,
  React.Dispatch<NotificationAction>
];

const initialState: NotificationState = '';

const notificationReducer = (
  _state: NotificationState,
  action: NotificationAction
): NotificationState => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message;
    case 'CLEAR_NOTIFICATION':
      return '';
    default:
      return initialState;
  }
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    initialState
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = (): NotificationState => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotificationValue must be used within a NotificationContextProvider'
    );
  }
  return context[0];
};

export const useNotificationDispatch =
  (): React.Dispatch<NotificationAction> => {
    const context = useContext(NotificationContext);
    if (!context) {
      throw new Error(
        'useNotificationDispatch must be used within a NotificationContextProvider'
      );
    }
    return context[1];
  };

export const setNotification = (message: string): NotificationAction => {
  return {
    type: 'SET_NOTIFICATION',
    message,
  };
};

export const clearNotification = (): NotificationAction => {
  return {
    type: 'CLEAR_NOTIFICATION',
  };
};

export default NotificationContext;
