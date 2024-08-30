import { environment } from "../environments/environments";

export class ApiService {
  private readonly URL = environment.apiUrl;

  async get(endpoint: string) {
    try {
      const response = await fetch(`${this.URL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Erro ao fazer a requisição:", error);
      throw error;
    }
  }
}
