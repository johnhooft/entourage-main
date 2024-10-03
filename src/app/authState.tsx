import React, { createContext, useState, useContext, useEffect } from 'react';
import { createClient } from '@/../utils/supabase/client';
import { Session, User } from '@supabase/supabase-js';

type AuthUser = {
  id: string;
  email: string | any;
  // Add other user properties as needed
};

type AuthContextType = {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const setUserFromSession = (session: Session | null) => {
    if (session?.user) {
      setUser({
        id: session.user.id,
        email: session.user.email,
        // Add other user properties here if needed
      });
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    const fetchInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUserFromSession(session);
      setLoading(false);
    };

    fetchInitialSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserFromSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setUserFromSession(data.session);
    } catch (error) {
      console.error('Login failed', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setUserFromSession(session);
    } catch (error) {
      console.error('User refresh failed', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};