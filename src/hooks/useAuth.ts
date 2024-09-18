import { useCallback, useEffect, useState } from "react";
import { Usuario } from "../models/Usuario";
import { UsuarioService } from "../services/usuario.service";
import { getToken } from "../token/tokenStorage";

export function useAuth() {
  const [isAutenticado, setIsAutenticado] = useState<boolean>(false);
  const [isCarregando, setIsCarregando] = useState<boolean>(true);
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const checkAuthStatus = useCallback(async () => {
    try {
      setIsCarregando(true);
      const token = await getToken();
      setIsAutenticado(!!token);
      if (token) {
        await fetchUsuario(token);
      } else {
        setUsuario(null);
      }
    } catch (error) {
      console.error("Erro na atutenticação:", error);
      setIsAutenticado(false);
      setUsuario(null);
    } finally {
      setIsCarregando(false);
    }
  }, []);

  const fetchUsuario = async (token: string) => {
    try {
      const usuarioService = new UsuarioService();
      const data = await usuarioService.perfilUsuario(token);
      setUsuario(data);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      setUsuario(null);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return { isAutenticado, isCarregando, usuario, checkAuthStatus };
}
