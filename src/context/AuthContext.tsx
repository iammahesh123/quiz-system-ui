import { createContext, useContext, useReducer, ReactNode } from "react";

// Define User Type
interface User {
  id: string;
  email: string;
  role: string;
  token: string;
}

// Define State Type
interface AuthState {
  user: User | null;
}

// Define Action Types
type AuthAction =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" };

// Reducer Function
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload)); // Store user data
      return { user: action.payload };
    case "LOGOUT":
      localStorage.removeItem("user");
      return { user: null };
    default:
      return state;
  }
};

// Create Context
const AuthContext = createContext<{ state: AuthState; dispatch: React.Dispatch<AuthAction> } | undefined>(
  undefined
);

// Provider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const storedUser = localStorage.getItem("user");
  const initialState: AuthState = { user: storedUser ? JSON.parse(storedUser) : null };

  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
