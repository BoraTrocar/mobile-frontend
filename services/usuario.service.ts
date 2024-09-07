import { Usuario } from "@/models/Usuario";
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
}
