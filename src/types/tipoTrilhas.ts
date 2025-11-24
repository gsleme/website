export type tipoTrilha ={
  id: string;
  titulo: string;
  descricao: string;
  areaFoco: string;
  xpTrilha: number;
}

export type tipoModulo ={
  id: string;
  idTrilha: string;
  titulo: string;
  descricao: string;
  tipo: string;
  conteudo:string;
  xpRecompensa: number;
  adaptacaoNecessaria: string;
}