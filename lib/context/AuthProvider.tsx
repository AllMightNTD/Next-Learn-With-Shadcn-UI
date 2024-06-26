"use client";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { axiosInstance } from "../axios";

const defaultValues = {
  user: null,
  loading: false,
};

const AuthContext = createContext(defaultValues);

interface ThemeProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<ThemeProps> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const value = {
    user,
    loading,
  };
  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token_next");
      if (token) {
        const res = await axiosInstance.get("/user/me");
        setUser(res?.data?.data);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [setUser]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser, setUser]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useThemeProvider = () => {
  return useContext(AuthContext);
};
