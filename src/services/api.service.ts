import axios from "axios";
import { environment } from "../environments/environments";
import { getToken } from "../token/tokenStorage"; // Importe o serviço de token

interface Headers {
  [key: string]: string;
}

export class ApiService {
  private readonly URL = environment.apiUrl;

  //Nao sei se esse se deveria estar aqui, talvez tenha q colocar la junto com token o ou no controle de rota para autenticar.
  private async getAuthHeaders(): Promise<Headers> {
    const token = await getToken();
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `${token}` } : {}),
    };

    return headers;
  }

  async get(endpoint: string, config?: { headers?: Headers }) {
    try {
      const headers = await this.getAuthHeaders();
      const url = `${this.URL}${endpoint}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          ...headers,
          ...config?.headers,
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

  //O post agora funciona
  async post(endpoint: string, data: any, headers?: Headers) {
    try {
      const authHeaders = await this.getAuthHeaders();
      const url = `${this.URL}${endpoint}`;
      const response = await axios.post(url, data, {
        headers: {
          ...authHeaders,
          ...headers,
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

  async delete(endpoint: string, headers?: Headers) {
    try {
      const authHeaders = await this.getAuthHeaders();
      const url = `${this.URL}${endpoint}`;

      const response = await axios.delete(url, {
        headers: {
          ...authHeaders,
          ...headers,
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

      console.error("Erro ao fazer a requisição DELETE:", errorMessage);
      throw new Error(errorMessage);
    }
  }
}
