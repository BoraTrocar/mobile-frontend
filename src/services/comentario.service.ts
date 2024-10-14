import { ApiService } from "./api.service";

class ComentarioService extends ApiService {
  async obterComentarios(idLivro: string) {
    try {
      const response = await this.get(`/comentarios/${idLivro}`);
      //console.log(response);

      return response;
    } catch (error) {
      console.error("Erro ao carregar comentários:", error);
      throw error;
    }
  }

  async adicionarComentario(idLivro: string, comentario: string) {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      await this.post(
        "/comentarios/cadastrar",
        {
          idLivro,
          comentario,
        },
        headers
      );
    } catch (error) {
      console.error("Erro ao adicionar comentário:", error);
      throw error;
    }
  }
}

export default new ComentarioService();
