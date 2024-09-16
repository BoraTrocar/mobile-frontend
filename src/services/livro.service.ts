import { ApiService } from "./api.service";

class LivroService extends ApiService {
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

    // Append text fields
    formData.append("isbn", data.isbn);
    formData.append("nomeLivro", data.nomeLivro);
    formData.append("categoria", data.categoria);
    formData.append("autor", data.autor);
    formData.append("condicao", data.condicao);
    formData.append("descricao", data.descricao);

    // Append image if it exists
    if (data.img) {
      const uriParts = data.img.split(".");
      const fileType = uriParts[uriParts.length - 1];

      formData.append("img", {
        uri: data.img,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      } as any);
    }

    // Define custom headers for multipart/form-data
    const headers = {
      "Content-Type": "multipart/form-data",
    };

    return this.post("/livro/cadastrar", formData, headers);
  }
}

export default new LivroService();
