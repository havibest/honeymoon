"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  onAuthStateChanged,
  User,
} from "firebase/auth";

import { auth } from "@/firebase/config";

import {
  loginUser,
  logoutUser,
  registerUser,
  resetUserPassword,
} from "@/services/auth.service";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  register: typeof registerUser;
  login: typeof loginUser;
  logout: typeof logoutUser;
  resetPassword: typeof resetUserPassword;
};

const AuthContext =
  createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    register: registerUser,
    login: loginUser,
    logout: logoutUser,
    resetPassword: resetUserPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}