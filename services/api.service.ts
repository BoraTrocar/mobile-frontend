import axios from "axios";
import { environment } from "../environments/environments";

interface Headers {
  [key: string]: string;
}

export class ApiService {
  private readonly URL = environment.apiUrlReal;
  private readonly UrlTeste = environment.apiUrl;

  async get(endpoint: string, config?: { headers?: Headers }) {
    try {
      const response = await fetch(`${this.URL}${endpoint}`, {
        method: "GET",
        headers: {
          ...config?.headers,
          "Content-Type": "application/json",
        },
      });

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

  async post(endpoint: string, data: any, headers?: Headers) {
    try {
      const response = await axios.post(`${this.URL}${endpoint}`, data, {
        headers: {
          ...headers,
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
}
