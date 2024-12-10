import { environment } from "../environments/environments";

export class PesquisaService {
  private readonly URL: string;

  constructor() {
    this.URL = environment.apiUrl;
  }

  async pesquisarLivros(termoPesquisa: string) {
    try {
      const endpoint = `/livro/pesquisar/${encodeURIComponent(termoPesquisa)}`;
      const url = `${this.URL}${endpoint}`;

      console.log("URL da requisição:", url);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const resultado = await response.json();
      console.log("Resposta recebida:", JSON.stringify(resultado, null, 2));
      return resultado;
    } catch (error) {
      console.error("Erro ao pesquisar livros:", error);
      if (error instanceof Error) {
        console.error("Mensagem de erro:", error.message);
      }
      throw error;
    }
  }
}
