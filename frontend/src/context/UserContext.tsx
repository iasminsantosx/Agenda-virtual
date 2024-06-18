import { createContext, useContext } from "react";

// Defina a interface para o tipo de usuário
interface UserType {
  id: number;
  name: string;
  email: string;
}

// Defina a interface para o contexto do usuário
interface UserContextType {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  logOut: () => void;
}

// Crie o contexto do usuário com um valor inicial
const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  logOut: () => {},
});

export const useUserContext = () => useContext(UserContext);

export default UserContext;
