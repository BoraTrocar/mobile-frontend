import axios from "axios";

export class CepService {
  private viacepUrl = "https://viacep.com.br/ws";

  async verificaCEP(cep: string) {
    try {
      const response = await axios.get(`${this.viacepUrl}/${cep}/json/`);

      if (response.data.erro) {
        return { error: true, message: "CEP não encontrado." };
      }

      return response.data;
    } catch (error) {
      return {
        error: true,
        message: "Erro ao buscar o CEP.",
      };
    }
  }
}
