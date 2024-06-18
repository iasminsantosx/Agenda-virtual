import React, { useState, ReactNode, useMemo } from "react";
import UserContext from "./UserContext";

// Defina a interface para o tipo de usuário
interface UserType {
  id: number;
  name: string;
  email: string;
}

// Defina a interface das props para UserProvider
interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  // Busca usuário no localStorage e salva no estado
  const savedUser = JSON.parse(
    localStorage.getItem("user") || "null"
  ) as UserType | null;
  const [user, setUser] = useState<UserType | null>(savedUser);

  // Limpa o localStorage, o estado e redireciona o usuário para tela de login
  const logOut = () => {
    localStorage.clear();
    setUser(null);
    // Supondo que você tem um hook useHistory do react-router-dom
    // history.push("/");
  };

  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      logOut,
    }),
    [user]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
