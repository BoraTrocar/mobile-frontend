import { Usuario } from "../models/Usuario";
import { ApiService } from "./api.service";

export class UsuarioService {
  private apiService = new ApiService();

  async getUsuario(): Promise<Usuario[]> {
    try {
      const data = await this.apiService.get("/usuarios");
      return data;
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      throw error;
    }
  }

  async cadastrarUsuario(usuario: any) {
    try {
      await this.apiService.post("/usuario/cadastrar", usuario);
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      throw error;
    }
  }
  // UsuarioService.ts
  async loginUsuario(usuario: any): Promise<string> {
    try {
      const response = await this.apiService.post("/usuario/logar", usuario);
      return response.token;
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      throw error;
    }
  }

  async perfilUsuario(token: string): Promise<Usuario> {
    try {
      const headers = {
        Authorization: `${token}`,
      };
      const response = await this.apiService.get("/usuario/perfil", {
        headers,
      });
      return response as Usuario; // Garante que o tipo retornado é Usuario
    } catch (error) {
      console.error("Erro ao encontrar perfil:", error);
      throw error;
    }
  }
}
