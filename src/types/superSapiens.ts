export interface Usuario {
  '@type': string;
  '@id': string;
  '@context': string;
  username: string;
  nome: string;
  assinaturaHTML: string;
  email: string;
  enabled: boolean;
  nivelAcesso: number;
  roles: any[];
  colaborador: {
    '@type': string;
    '@id': string;
    '@context': string;
    lotacoes: any[];
    id: number;
    uuid: string;
    ativo: boolean;
    criadoEm: string;
    atualizadoEm: string;
  };
  coordenadores: any[];
  validado: boolean;
  reset: boolean;
  isDisponivel: boolean;
  passwordAtualizadoEm: string;
  id: number;
  uuid: string;
  criadoEm: string;
  atualizadoEm: string;
}

export interface Colaborador {
  '@type': string;
  '@id': string;
  '@context': string;
  usuario: Usuario;
  lotacoes: any[];
  id: number;
  uuid: string;
  ativo: boolean;
  criadoEm: string;
  atualizadoEm: string;
}

export interface Setor {
  '@type': string;
  '@id': string;
  '@context': string;
  ativo: boolean;
  endereco: string;
  sigla: string;
  unidade?: Setor;
  expansable: boolean;
  prefixoNUP: string;
  sequenciaInicialNUP: number;
  divergenciaMaxima: number;
  gerenciamento?: boolean;
  apenasProtocolo: boolean;
  numeracaoDocumentoUnidade: boolean;
  apenasDistribuidor: boolean;
  distribuicaoCentena: boolean;
  prazoEqualizacao: number;
  apenasDistribuicaoAutomatica: boolean;
  comPrevencaoRelativa: boolean;
  hasChild: boolean;
  id: number;
  uuid: string;
  nome: string;
  criadoEm: string;
  atualizadoEm: string;
  email?: string;
}

export interface Lotacao {
  '@type': string;
  '@id': string;
  '@context': string;
  colaborador: Colaborador;
  setor: Setor;
  peso: number;
  principal: boolean;
  criarCoordenacao: boolean;
  distribuidor: boolean;
  arquivista: boolean;
  pcu: boolean;
  id: number;
  uuid: string;
  criadoEm: string;
  atualizadoEm: string;
}

export interface SuperSapiensResponse {
  entities: Lotacao[];
  total: number;
}

export interface BuscarColaboradorParams {
  nome: string;
  limit?: number;
  offset?: number;
}

export interface CadastroAvaliadorPayload {
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  unidade: {
    unidadeId: number;
    nome: string;
  };
  setor: {
    setorId: number;
    nome: string;
  };
}