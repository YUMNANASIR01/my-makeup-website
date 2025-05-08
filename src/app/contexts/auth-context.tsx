'use client'; // Add this line to mark the file as a client component

import { createContext, useContext, useState } from 'react';

// Define a type for the user
interface User {
  id: string;
  name: string;
  email: string;
  // Add any other properties your user object might have
}

// Create the context
const AuthContext = createContext<{
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}>({
  user: null,
  login: () => {},
  logout: () => {},
});

// AuthProvider component that provides context to its children
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Login function to set the user data
  const login = (userData: User) => setUser(userData);
  
  // Logout function to clear the user data
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access the AuthContext
export const useAuth = () => useContext(AuthContext);
















// 'use client'; // Add this line to mark the file as a client component

// import { createContext, SetStateAction, useContext, useState } from 'react';

// // Create the context
// const AuthContext = createContext({
//   user: null,
//   login: (userData: any) => {},
//   logout: () => {},
// });

// // AuthProvider component that provides context to its children
// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState(null);

//   // Login function to set the user data
//   const login = (userData: SetStateAction<null>) => setUser(userData);
  
//   // Logout function to clear the user data
//   const logout = () => setUser(null);

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// // Custom hook to access the AuthContext
// export const useAuth = () => useContext(AuthContext);

