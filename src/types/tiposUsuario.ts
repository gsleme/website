export type tipoUsuarioForm = {
    nome: string;
    username: string;
    email: string;
    senha: string;
    confirmarSenha: string;
    area: string;
    acessibilidade: string;
}

export type tipoTokenInfo = {
    idUsuario: string;
    id: string;
    area: string;
    acessibilidade: string;
    modulosConcluidos: number;
    tempoPlataformaDias: number;
}

export type tipoToken = {
    sub: string;
    area: string;
    acessibilidade: string;
    modulosConcluidos: number;
    tempoPlataformaDias: number;
    exp: number;
}

export type tipoUsuario ={
  id: string;
  nome: string;
  username: string;
  email: string;
  area: string;
  acessibilidade: string;
  modulosConcluidos: number;
  xpTotal: number;
  dataCadastro: string;
}
