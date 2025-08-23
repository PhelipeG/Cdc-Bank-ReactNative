import React, { createContext, useEffect, useState } from "react";
import { storage } from "../services/storage";

interface AuthContextType {
  user: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
 useEffect(() => {
    const loadStorage = async () => {
      try {
        const savedUser = await storage.getData<string>('@user');
        if (savedUser) setUser(savedUser);
      } catch (err) {
        console.log('Erro ao carregar user do storage', err);
      } finally {
        setLoading(false);
      }
    };
    loadStorage();
  }, []); 

  const login = async (email: string, password: string) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setUser(email);
    await storage.setData("@user", email,);
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setUser(null);
    await storage.removeData("@user");
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
