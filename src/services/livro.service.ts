import { ApiService } from "./api.service";

class LivroService extends ApiService {
  //So deus sabe como esse esquema da img funciona
  async cadastrarLivro(data: {
    img: string | null;
    isbn: string;
    nomeLivro: string;
    categoria: string;
    autor: string;
    condicao: string;
    descricao: string;
  }) {
    const formData = new FormData();

    formData.append("isbn", data.isbn);
    formData.append("nomeLivro", data.nomeLivro);
    formData.append("categoria", data.categoria);
    formData.append("autor", data.autor);
    formData.append("condicao", data.condicao);
    formData.append("descricao", data.descricao);

    if (data.img) {
      const uriParts = data.img.split(".");
      const fileType = uriParts[uriParts.length - 1];

      formData.append("img", {
        uri: data.img,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      } as any);
    }

    const headers = {
      "Content-Type": "multipart/form-data",
    };

    return this.post("/livro/cadastrar", formData, headers);
  }

  // Puxa todos os livros
  async obterTodosOsLivros() {
    return this.get("/livro/all");
  }

  // Deletar livro
  async deletarLivro(idLivro: string) {
    return this.delete(`/livro/deletar/${idLivro}`);
  }

  // Alterar Livro
  async alterarLivro(
    idLivro: string,
    data: {
      isbn: string;
      nomeLivro: string;
      categoria: string;
      autor: string;
      condicao: string;
      descricao: string;
    }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    return this.put(`/livro/alterar/${idLivro}`, JSON.stringify(data), headers);
  }
}

export default new LivroService();
