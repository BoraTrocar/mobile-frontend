import { LivroProps } from "./LivroProps";

export interface Usuario {
  nomeCompleto: string;
  email: string;
  imagem: string;
  nickname: string;
  tipoConta: string;
  fotoPerfil: string;
  anunciosPostados: LivroProps[]; // Lista de livros
}
