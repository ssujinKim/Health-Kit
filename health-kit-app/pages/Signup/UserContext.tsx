// UserContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from './types'; // User 인터페이스를 임포트합니다.

interface UserContextType {
  user: User;
  updateUser: (key: keyof User, value: string | number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({
    nickname: '',
    email: '',
    password: '',
    age: 0,
    height: 0,
    weight: 0,
    gender: ''
  });

  const updateUser = (key: keyof User, value: string | number) => {
    setUser((prevUser) => ({
      ...prevUser,
      [key]: value,
    }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
