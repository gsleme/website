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
    id: string;
    area: string;
    acessibilidade: string;
    modulosConcluidos: number;
    tempoPlataformaDias: number;
    exp: number;
}

export type UsuarioDashboard ={
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
