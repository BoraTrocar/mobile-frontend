import { Usuario } from "../models/Usuario";
import { ApiService } from "./api.service";

export class UserService {
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
}
