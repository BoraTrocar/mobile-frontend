export interface UsuarioCadastro {
  imagemPerfil:string | null;
  nomeUsuario: string;
  email: string;
  nickname: string;
  senha: string;
  dataNascimento: string;
  cep: string;
  cidade: string;
  uf: string;
}
/* Isso aqui é temporario dps vou juntar tudo no outro model*/