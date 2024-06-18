import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import UserContext from "../../context/UserContext";
import { loginService } from "@/services/loginService";

const CardLogin = () => {
  const navigate = useNavigate(); // Substitui o useHistory

  const { setUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "null");

    if (userData) {
      navigate("/home");
    }
  }, [navigate]);

  const handleLoginBtn = async () => {
    try {
      const response = await loginService({
        email,
        senha,
      });

      localStorage.setItem("user", JSON.stringify(response.data.usuario));
      setUser(response.data.usuario);
      navigate("/home");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <div className="p-8 bg-white rounded-2xl border border-slate-200 flex-col justify-start items-start gap-6 w-full max-w-sm mx-auto">
      <h2 className="text-3xl font-semibold tracking-tight">Entrar</h2>

      <div className="flex flex-col gap-6 w-full">
        <div className="grid grid-cols-1 gap-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            type="email"
            id="email"
            placeholder="exemplo@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-2">
          <Label htmlFor="password">Senha</Label>
          <Input
            type="password"
            id="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Button variant="default" onClick={handleLoginBtn}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default CardLogin;
