import { ApiService } from "./api.service";

//Acho que devo usar ele como uma interface e pegar do model
class LivroService extends ApiService {
  async cadastrarLivro(data: {
    img: string | null;
    isbn: string;
    categoria: string;
    autor: string;
    condicao: string;
    descricao: string;
  }) {
    return this.post("/livro/cadastrar", data);
  }
}

export default new LivroService();
