import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  login as loginApi,
  register as registerApi,
  getProfile,
} from "../services/authService";

type User = {
  id: number;
  username: string;
  email: string;
  avatar?: string | null;
  bio?: string | null;
  created_at?: string;
};

type RegisterData = {
  username: string;
  email: string;
  password: string;
};

type LoginData = {
  email: string;
  password: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;

  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
};

const AuthContext =
  createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(null);

  const [token, setToken] =
    useState<string | null>(
      localStorage.getItem("token")
    );

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadUser() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const profile =
          await getProfile(token);

        setUser(profile);

      } catch (err) {
        console.error(err);

        localStorage.removeItem("token");

        setToken(null);

        setUser(null);

      } finally {
        setLoading(false);
      }
    }

    loadUser();

  }, [token]);

  async function login(
    data: LoginData
  ) {
    const res =
      await loginApi(data);

    localStorage.setItem(
      "token",
      res.token
    );

    setToken(res.token);

    setUser(res.user);
  }

  async function register(
    data: RegisterData
  ) {
    await registerApi(data);
  }

  function logout() {
    localStorage.removeItem("token");

    setToken(null);

    setUser(null);
  }

  function updateUser(updated: User) {
    setUser(updated);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,

        login,
        register,
        logout,
        updateUser,
      }}
    >
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