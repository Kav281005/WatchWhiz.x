// AuthContext.jsx

//const AuthContext = createContext();

// export function useAuth() {
    //   return useContext(AuthContext);
    // }
    
    // export function AuthProvider({ children }) {
        //   const [user, setUser] = useState(null);
        //   const login = ({ username, password }) => { /* ... */ };
        //   return <AuthContext.Provider value={{ user, login }}>{children}</AuthContext.Provider>;
        // }
        // import { createContext, useContext, useState } from "react";
        // import axios from "axios";
        
        // const AuthContext = createContext();
        
        // // Custom hook to use the auth context
        // export function useAuth() {
            //   return useContext(AuthContext);
            // }
            
            // // AuthProvider wraps your app and provides auth state
            // export function AuthProvider({ children }) {
                //   const [user, setUser] = useState(null);
                
                //   // login makes a request to your backend and updates user
                //   const login = async ({ username, password }) => {
                    //     const res = await axios.post('/api/auth/login', { username, password }, { withCredentials: true });
                    //     if (res.data.success) setUser(res.data.user);
                    //     else throw new Error(res.data.error || 'Login failed');
                    //   };
                    
                    //   const logout = async () => {
                        //     await axios.get('/api/auth/logout', { withCredentials: true });
                        //     setUser(null);
                        //   };
                        // if (!res.ok) {
                            //   const text = await res.text();
                            //   console.error('API error:', res.status, text);
                            //   setError(text || `Failed with status ${res.status}`);
                            //   return;
                            // }
                            // const data = await res.json(); // safe to parse now
                            // // handle success...
                            
                            //   // Optional: add logout, register, etc.
                            
                            //   return (
                                //     <AuthContext.Provider value={{ user, login }}>
                                //       {children}
                                //     </AuthContext.Provider>
                                //   );
                                // }
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
        export const AuthContext = createContext();
        
        export function useAuth() {
            return useContext(AuthContext);
        }
        export function AuthProvider({ children }) {
            const [user, setUser] = useState(null);
            
            const login = async ({ username, password }) => {
                const res = await axios.post('/api/auth/login', { username, password }, { withCredentials: true });
                if (res.data.success) setUser(res.data.user);
                else throw new Error(res.data.error || 'Login failed');
            };
            
            const register = async ({ username, password, email, fullname }) => {
                // const res = await axios.post('/api/auth/register', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //  credentials: 'include',
                //     body: JSON.stringify({ username, password, email, fullname }),
                // });
                // if (!res.ok) {
                //     const text = await res.text();
                //     console.error('API error', res.status, text);
                //     throw new Error(text|| `Status ${res.status}`);
                // }
                // const data = await res.json(); 
                //  setUser(data.user);
                const res = await axios.post('/api/auth/register',
                  { username, password, email, fullname },
                   { withCredentials: true }
                );
                 if (!res.data.success) throw new Error(res.data.error || 'Registration failed');
                 setUser(res.data.user);
  
                // return data;
                // else throw new Error(data.error || 'Registration failed');
            };
            
            const logout = async () => {
                await axios.get('/api/auth/logout', { withCredentials: true });
                setUser(null);
            };
            
            // const res = async fetch('/api/auth/register', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   credentials: 'include',
            
  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
