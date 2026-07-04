import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { authService, type LoginInput, type SignupInput } from "@/services/auth.service";
import type { AuthSession, User } from "@/types/models";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (input: LoginInput) => Promise<void>;
  signup: (input: SignupInput) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const session = authService.getStoredSession();
    setUser(session?.user ?? null);
    setIsLoading(false);
  }, []);

  const handleSession = useCallback((session: AuthSession) => {
    setUser(session.user);
  }, []);

  const login = useCallback(
    async (input: LoginInput) => {
      setError(null);
      setIsLoading(true);
      try {
        const session = await authService.login(input);
        handleSession(session);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to log in. Please try again.");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [handleSession],
  );

  const signup = useCallback(
    async (input: SignupInput) => {
      setError(null);
      setIsLoading(true);
      try {
        const session = await authService.signup(input);
        handleSession(session);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to create your account. Please try again.");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [handleSession],
  );

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: user !== null,
      isLoading,
      error,
      login,
      signup,
      logout,
      clearError,
    }),
    [user, isLoading, error, login, signup, logout, clearError],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
