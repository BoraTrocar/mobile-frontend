import { ApiService } from "./api.service";
import { uploadImage } from "../../firebaseConfig";

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
    let imageUrl = null;

    if (data.img) {
      try {
        imageUrl = await uploadImage(data.img);
      } catch (error) {
        console.error("Error uploading image to Firebase:", error);
        throw new Error("Failed to upload image");
      }
    }

    const formData = new FormData();

    formData.append("isbn", data.isbn);
    formData.append("nomeLivro", data.nomeLivro);
    formData.append("categoria", data.categoria);
    formData.append("autor", data.autor);
    formData.append("condicao", data.condicao);
    formData.append("descricao", data.descricao);

    if (imageUrl) {
      formData.append("img", imageUrl);
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
      img?: string | null;
      isbn: string;
      nomeLivro: string;
      categoria: string;
      autor: string;
      condicao: string;
      descricao: string;
    }
  ) {
    let imageUrl = null;

    if (data.img && data.img.startsWith("file://")) {
      try {
        imageUrl = await uploadImage(data.img);
      } catch (error) {
        console.error("Error uploading image to Firebase:", error);
        throw new Error("Failed to upload image");
      }
    }

    const formData = new FormData();

    formData.append("isbn", data.isbn);
    formData.append("nomeLivro", data.nomeLivro);
    formData.append("categoria", data.categoria);
    formData.append("autor", data.autor);
    formData.append("condicao", data.condicao);
    formData.append("descricao", data.descricao);

    if (imageUrl) {
      formData.append("img", imageUrl);
    } else if (data.img) {
      formData.append("img", data.img);
    }

    const headers = {
      "Content-Type": "multipart/form-data",
    };

    return this.put(`/livro/alterar/${idLivro}`, formData, headers);
  }
}

export default new LivroService();
