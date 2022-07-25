import React, { createContext } from 'react';

const Context = createContext();

function AuthProvider({ children }) {
  return (
    <Context.Provider value={{authenticated: true}}>
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };