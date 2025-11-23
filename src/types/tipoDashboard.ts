export type PrevisaoIA ={
  taxa_sucesso: number;
  categoria: 'baixa' | 'media' | 'alta';
}

export type Sugestao ={
  id: string;
  idUsuario: string;
  idModulo: string; 
  dataSugestao: string;
}

export type ProgressoTrilha ={
  totalModulos: number;
  modulosConcluidos: number;
  percentual: number;
  idsModulosConcluidos: string[];
}