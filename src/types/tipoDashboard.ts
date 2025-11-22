interface Usuario {
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

interface Trilha {
  id: string;
  titulo: string;
  descricao: string;
  areaFoco: string;
  xpTrilha: number;
}

interface Modulo {
  id: string;
  idTrilha: string;
  titulo: string;
  descricao: string;
  tipo: string;
  xpRecompensa: number;
  adaptacaoNecessaria: string;
}

interface PrevisaoIA {
  taxa_sucesso: number;
  categoria: 'baixa' | 'media' | 'alta';
}