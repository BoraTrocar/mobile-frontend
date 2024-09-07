import axios from "axios";
import { environment } from "../environments/environments";

export class ApiService {
  //To trabalhando com as duas api's ao mesmo tempo por enquanto a api real por enquanto so atende o cadastro de usuario.
  private readonly URL = environment.apiUrlReal;
  private readonly UrlTeste = environment.apiUrl;

  async get(endpoint: string) {
    try {
      const response = await fetch(`${this.UrlTeste}${endpoint}`);
      if (!response.ok) {
        throw new Error(
          `Erro na requisição GET: ${response.status} - ${response.statusText}`
        );
      }
      return await response.json();
    } catch (error) {
      console.error("Erro ao fazer a requisição GET:", error);
      throw error;
    }
  }

  async post(endpoint: string, data: any) {
    try {
      const response = await axios.post(`${this.URL}${endpoint}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      let errorMessage = "Erro inesperado";

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      console.error("Erro ao fazer a requisição POST:", errorMessage);
      throw new Error(errorMessage);
    }
  }
  // Adicionar o path dps
}
