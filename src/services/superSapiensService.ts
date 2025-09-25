import { BuscarColaboradorParams, SuperSapiensResponse, CadastroAvaliadorPayload } from '../types/superSapiens';

const SUPERSAPIENS_BASE_URL = 'https://supersapiensbackend.agu.gov.br/v1';

export class SuperSapiensService {
  static async buscarColaborador(params: BuscarColaboradorParams): Promise<SuperSapiensResponse> {
    const nomeTermos = params.nome.trim().split(' ').filter(termo => termo.length > 0);
    
    // Construir condições para cada termo do nome
    const condicoes = nomeTermos.map(termo => ({
      'colaborador.usuario.nome': `like:%${termo.toUpperCase()}%`
    }));

    // Montar parâmetros como query string
    const queryParams = new URLSearchParams();
    queryParams.append('where', JSON.stringify({ andX: condicoes }));
    queryParams.append('limit', String(params.limit || 30));
    queryParams.append('offset', String(params.offset || 0));
    queryParams.append('order', JSON.stringify({}));
    queryParams.append('populate', JSON.stringify([
      'colaborador',
      'colaborador.usuario',
      'colaborador.usuario.colaborador',
      'setor',
      'setor.unidade'
    ]));
    queryParams.append('context', JSON.stringify({ semAfastamento: true }));

    const token = localStorage.getItem('token');
    const response = await fetch(`${SUPERSAPIENS_BASE_URL}/administrativo/lotacao?${queryParams.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar colaborador: ${response.status}`);
    }

    return response.json();
  }

  static async cadastrarAvaliador(payload: CadastroAvaliadorPayload): Promise<any> {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Token de autenticação não encontrado');
    }
    
    const response = await fetch(`${backendUrl}/avaliador`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Erro ao cadastrar avaliador: ${response.status} - ${errorMessage}`);
    }

    return response.json();
  }
}