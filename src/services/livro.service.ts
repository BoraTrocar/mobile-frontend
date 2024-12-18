import { deleteImage, uploadImage } from "../../firebaseConfig";
import { ApiService } from "./api.service";

class LivroService extends ApiService {
  async cadastrarLivro(data: {
    imagem: string | null;
    isbn: string;
    nomeLivro: string;
    categoria: string;
    autor: string;
    condicao: string;
    descricao: string;
  }) {
    let imageUrl = null;

    if (data.imagem) {
      try {
        imageUrl = await uploadImage(data.imagem);
      } catch (error) {
        console.error("Error uploading image to Firebase:", error);
        throw new Error("Failed to upload image");
      }
    }

    const requestData = {
      isbn: data.isbn,
      nomeLivro: data.nomeLivro,
      categoria: data.categoria,
      autor: data.autor,
      condicao: data.condicao,
      descricao: data.descricao,
      imagem: imageUrl,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    return this.post("/livro/cadastrar", requestData, headers);
  }

  async obterLivrosPaginados(page: number, size: number) {
    const response = await this.get(`/anuncio?page=${page}&size=${size}`);
    console.log("Buscando página:", page, "com tamanho:", size);
    //console.log("Response:", response);
    return response;
  }

  // Deletar livro
  async deletarLivro(idLivro: string, imagemURL: string) {
    console.log("passou");
    await deleteImage(imagemURL);

    return this.delete(`/livro/deletar/${idLivro}`);
  }

  // Alterar Livro
  async alterarLivro(
    idLivro: string,
    data: {
      imagem?: string | null;
      isbn: string;
      nomeLivro: string;
      categoria: string;
      autor: string;
      condicao: string;
      descricao: string;
    }
  ) {
    let imageUrl = null;

    if (data.imagem && data.imagem.startsWith("file://")) {
      try {
        imageUrl = await uploadImage(data.imagem);
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
      formData.append("imagem", imageUrl);
    } else if (data.imagem) {
      formData.append("imagem", data.imagem);
    }

    const headers = {
      "Content-Type": "multipart/form-data",
    };

    return this.put(`/livro/alterar/${idLivro}`, formData, headers);
  }

  async livrosSugeridos(distanciaKm: number) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    return this.get(`/livro/pesquisarlocalizacao/${distanciaKm}`, config);
  }
}
export default new LivroService();
