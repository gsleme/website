export type Trilha ={
  id: string;
  titulo: string;
  descricao: string;
  areaFoco: string;
  xpTrilha: number;
}

export type Modulo ={
  id: string;
  idTrilha: string;
  titulo: string;
  descricao: string;
  tipo: string;
  xpRecompensa: number;
  adaptacaoNecessaria: string;
}