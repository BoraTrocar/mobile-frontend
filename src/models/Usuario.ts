import { LivroProps } from "./LivroProps";

export interface Usuario {
  nomeCompleto: string;
  email: string;
  imagemPerfil: string;
  nickname: string;
  tipoConta: string;
  anunciosPostados: LivroProps[]; // Lista de livros
  notificacao: boolean;
}
