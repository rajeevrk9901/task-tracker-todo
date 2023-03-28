import React, { createContext, useState, useEffect } from 'react'


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [token, setToken] = useState(localStorage.getItem('token'));

  const [searchProduct, setSearchProduct] = useState("")



  // const [role, setRole] = useState("VENDOR");
  // console.log(role, 11)


  return (
    <AuthContext.Provider value={{ token, setToken, role, setRole, isLoggedIn, setIsLoggedIn, setSearchProduct, searchProduct }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;