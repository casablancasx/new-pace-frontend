import { useState, useEffect } from "react";
import PageMeta from "../components/common/PageMeta";
import { useModal } from "../hooks/useModal";

import { Modal } from "../components/ui/modal";
import Button from "../components/ui/button/Button";
import { SuperSapiensService } from "../services/superSapiensService";
import { Lotacao, CadastroAvaliadorPayload } from "../types/superSapiens";

// Interface para os dados dos avaliadores
interface Avaliador {
  id: number;
  nome: string;
  email: string;
  especialidade: string;
  telefone: string;
  status: 'Ativo' | 'Inativo';
}

const Avaliador = () => {
  const { isOpen: isRegisterOpen, openModal: openRegisterModal, closeModal: closeRegisterModal } = useModal();
  const { isOpen: isEditOpen, openModal: openEditModal, closeModal: closeEditModal } = useModal();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  const [currentAvaliador, setCurrentAvaliador] = useState<Avaliador | null>(null);
  const [editForm, setEditForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    status: 'Ativo' as 'Ativo' | 'Inativo',
  });

  // Estados para o modal de cadastro
  const [colaboradores, setColaboradores] = useState<Lotacao[]>([]);
  const [selectedColaborador, setSelectedColaborador] = useState<Lotacao | null>(null);
  const [loading, setLoading] = useState(false);
  const [cadastroForm, setCadastroForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    setor: '',
    unidade: '',
  });

  const [avaliadores, setAvaliadores] = useState<Avaliador[]>([
    { 
      id: 1, 
      nome: 'João Silva', 
      email: 'joao.silva@email.com', 
      especialidade: 'Cardiologia', 
      telefone: '(11) 99999-9999', 
      status: 'Ativo' 
    },
    { 
      id: 2, 
      nome: 'Maria Santos', 
      email: 'maria.santos@email.com', 
      especialidade: 'Neurologia', 
      telefone: '(11) 88888-8888', 
      status: 'Ativo' 
    },
    { 
      id: 3, 
      nome: 'Dr. Pedro Costa', 
      email: 'pedro.costa@email.com', 
      especialidade: 'Ortopedia', 
      telefone: '(11) 77777-7777', 
      status: 'Inativo' 
    },
  ]);

  // Simulação de chamada de API
  useEffect(() => {
    // Aqui seria feita a chamada para a API
    // Exemplo:
    // const fetchAvaliadores = async () => {
    //   try {
    //     const response = await fetch('https://api.example.com/avaliadores');
    //     const data = await response.json();
    //     setAvaliadores(data);
    //   } catch (error) {
    //     console.error('Erro ao buscar avaliadores:', error);
    //   }
    // };
    // 
    // fetchAvaliadores();
  }, []);

  // Função para buscar colaboradores
  const buscarColaboradores = async (nome: string) => {
    if (nome.length < 2) {
      setColaboradores([]);
      return;
    }

    setLoading(true);
    try {
      const response = await SuperSapiensService.buscarColaborador({ nome });
      setColaboradores(response.entities);
    } catch (error) {
      console.error('Erro ao buscar colaboradores:', error);
      setColaboradores([]);
    } finally {
      setLoading(false);
    }
  };

  // Função para lidar com o submit do formulário de busca
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      buscarColaboradores(searchTerm.trim());
    }
  };

  // Função para lidar com tecla Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchTerm.trim()) {
        buscarColaboradores(searchTerm.trim());
      }
    }
  };

  const handleSelecionarColaborador = (colaborador: Lotacao) => {
    setSelectedColaborador(colaborador);
    setCadastroForm({
      nome: colaborador.colaborador.usuario.nome,
      email: colaborador.colaborador.usuario.email,
      telefone: '',
      setor: colaborador.setor.nome,
      unidade: colaborador.setor.unidade?.nome || '',
    });
  };

  const handleCadastrar = async () => {
    if (!selectedColaborador) return;

    try {
      setLoading(true);
      const payload: CadastroAvaliadorPayload = {
        nome: cadastroForm.nome,
        email: cadastroForm.email,
        telefone: cadastroForm.telefone,
        sapiensId: selectedColaborador.colaborador.usuario.id,
        unidadeId: selectedColaborador.setor.unidade?.id || 0,
        setorId: selectedColaborador.setor.id,
      };

      await SuperSapiensService.cadastrarAvaliador(payload);
      
      // Adicionar à lista local
      const novoAvaliador: Avaliador = {
        id: Date.now(),
        nome: cadastroForm.nome,
        email: cadastroForm.email,
        especialidade: cadastroForm.setor,
        telefone: cadastroForm.telefone,
        status: 'Ativo'
      };
      
      setAvaliadores([...avaliadores, novoAvaliador]);
      setSearchTerm("");
      setSelectedColaborador(null);
      setCadastroForm({
        nome: '',
        email: '',
        telefone: '',
        setor: '',
        unidade: '',
      });
      closeRegisterModal();
    } catch (error) {
      console.error('Erro ao cadastrar avaliador:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleOpenEdit = (avaliador: Avaliador) => {
    setCurrentAvaliador(avaliador);
    setEditForm({
      nome: avaliador.nome,
      email: avaliador.email,
      telefone: avaliador.telefone,
      status: avaliador.status,
    });
    openEditModal();
  };
  
  const handleEditSave = () => {
    if (!currentAvaliador) return;
    
    // Aqui seria feita a chamada para a API para editar o avaliador
    // Simulando uma edição no estado local
    const updatedAvaliadores = avaliadores.map((av) => 
      av.id === currentAvaliador.id 
        ? { ...av, nome: editForm.nome, email: editForm.email, telefone: editForm.telefone, status: editForm.status }
        : av
    );
    
    setAvaliadores(updatedAvaliadores);
    closeEditModal();
  };
  
  // Filtrar avaliadores baseado no termo de busca
  const filteredAvaliadores = avaliadores.filter(avaliador => {
    const searchLower = filterTerm.toLowerCase();
    return (
      avaliador.nome.toLowerCase().includes(searchLower) ||
      avaliador.email.toLowerCase().includes(searchLower) ||
      avaliador.especialidade.toLowerCase().includes(searchLower)
    );
  });

  return (
    <>
      <PageMeta title="Gerenciamento de Avaliadores" description="Gerenciamento de avaliadores" />
      
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-black dark:text-white">Gerenciamento de Avaliadores</h2>
      </div>
     
      <div className="rounded-sm border border-stroke bg-white p-10 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-col gap-9">
         
          
          {/* Cabeçalho com pesquisa e botão */}
          <div className="mb-4.5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center">
                
                
                {/* Barra de pesquisa à esquerda */}
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2">
                    <svg
                      className="fill-body dark:fill-bodydark"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                        fill="currentColor"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Pesquisa por nome avaliador"
                    value={filterTerm}
                    onChange={(e) => setFilterTerm(e.target.value)}
                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
                  />
                </div>
              </div>
              
              {/* Botão Adicionar Avaliador à direita */}
              <Button 
                variant="primary"
                onClick={openRegisterModal}
                startIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                }
              >
                Adicionar Avaliador
              </Button>
            </div>
          </div>

          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="py-6 px-4 md:px-6 xl:px-7.5">
              <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                      <th className="py-4 px-4 font-medium text-black dark:text-white">
                        Nome
                      </th>
                      <th className="py-4 px-4 font-medium text-black dark:text-white">
                        Email
                      </th>
                      <th className="py-4 px-4 font-medium text-black dark:text-white">
                        Setor
                      </th>
                      <th className="py-4 px-4 font-medium text-black dark:text-white">
                        Unidade
                      </th>
                      <th className="py-4 px-4 font-medium text-black dark:text-white">
                        Status
                      </th>
                      <th className="py-4 px-4 font-medium text-black dark:text-white">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAvaliadores.map((avaliador) => (
                      <tr key={avaliador.id}>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">{avaliador.nome}</p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">{avaliador.email}</p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">{avaliador.especialidade}</p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">{avaliador.telefone}</p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <span className={`inline-flex rounded-full py-1 px-3 text-sm font-medium ${
                            avaliador.status === 'Ativo' 
                              ? 'bg-success bg-opacity-10 text-success' 
                              : 'bg-danger bg-opacity-10 text-danger'
                          }`}>
                            {avaliador.status}
                          </span>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <div className="flex items-center space-x-3.5">
                            {/* Edit Button */}
                            <button 
                              className="hover:text-primary"
                              onClick={() => handleOpenEdit(avaliador)}
                            >
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </button>
                            {/* Delete Button */}
                            <button className="hover:text-primary">
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z" fill="currentColor" />
                                <path d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z" fill="currentColor" />
                                <path d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z" fill="currentColor" />
                                <path d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z" fill="currentColor" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredAvaliadores.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-gray-500">
                          Nenhum avaliador encontrado.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Cadastro */}
      <Modal isOpen={isRegisterOpen} onClose={closeRegisterModal} className="max-w-[500px] m-4">
        <div className="p-6">
          <h3 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Pesquisar Colaborador
          </h3>
          
          {!selectedColaborador ? (
            <>
              <div className="mb-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  Nome do Colaborador
                </label>
                <form onSubmit={handleSearchSubmit}>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2">
                      <svg
                        className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                          fill="currentColor"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                    <input
                      type="text"
                      placeholder="Digite o nome do colaborador e pressione Enter..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 pl-12 pr-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </form>
              </div>

              {/* Lista de colaboradores encontrados */}
              {loading && (
                <div className="mb-4 text-center py-4">
                  <p className="text-gray-500 dark:text-gray-400">Buscando colaboradores...</p>
                </div>
              )}

              {colaboradores.length > 0 && (
                <div className="mb-6 max-h-60 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="px-4 py-3 text-sm font-medium text-black dark:text-white bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    Consulta de Lotações
                  </h4>
                  <div className="">
                    {colaboradores.map((lotacao) => (
                      <div
                        key={lotacao.id}
                        onClick={() => handleSelecionarColaborador(lotacao)}
                        className="p-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                      >
                        <div className="font-semibold text-blue-600 dark:text-blue-400 text-sm mb-1">
                          {lotacao.colaborador.usuario.nome}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-800 dark:text-gray-300">
                              {lotacao.setor.unidade?.nome}
                            </span>
                            <span className="text-gray-500 dark:text-gray-400">
                              ({lotacao.setor.unidade?.sigla})
                            </span>
                          </div>
                          <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-600">
                            <span className="font-medium text-gray-800 dark:text-gray-300">
                              {lotacao.setor.nome}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Formulário de cadastro */}
              <div className="mb-4">
                <button
                  onClick={() => {
                    setSelectedColaborador(null);
                    setCadastroForm({
                      nome: '',
                      email: '',
                      telefone: '',
                      setor: '',
                      unidade: '',
                    });
                  }}
                  className="text-sm text-blue-500 hover:text-blue-600 mb-4"
                >
                  ← Voltar para busca
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2.5 block text-black dark:text-white">
                    Nome <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={cadastroForm.nome}
                    onChange={(e) => setCadastroForm(prev => ({ ...prev, nome: e.target.value }))}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-2.5 block text-black dark:text-white">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={cadastroForm.email}
                    onChange={(e) => setCadastroForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-2.5 block text-black dark:text-white">
                    Telefone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={cadastroForm.telefone}
                    onChange={(e) => setCadastroForm(prev => ({ ...prev, telefone: e.target.value }))}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div>
                  <label className="mb-2.5 block text-black dark:text-white">
                    Setor
                  </label>
                  <input
                    type="text"
                    value={cadastroForm.setor}
                    disabled
                    className="w-full rounded border-[1.5px] border-stroke bg-gray-100 py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-2.5 block text-black dark:text-white">
                    Unidade
                  </label>
                  <input
                    type="text"
                    value={cadastroForm.unidade}
                    disabled
                    className="w-full rounded border-[1.5px] border-stroke bg-gray-100 py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
            </>
          )}

          <div className="flex justify-end gap-3 mt-5">
            <Button 
              variant="outline" 
              onClick={closeRegisterModal}
            >
              Cancelar
            </Button>
            <Button 
              variant="primary"
              onClick={handleCadastrar}
              disabled={!selectedColaborador || !cadastroForm.nome.trim() || !cadastroForm.email.trim() || !cadastroForm.telefone.trim() || loading}
            >
              {loading ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal de Edição */}
      <Modal isOpen={isEditOpen} onClose={closeEditModal} className="max-w-[500px] m-4">
        <div className="p-6">
          <h3 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Editar Avaliador
          </h3>
          
          {currentAvaliador && (
            <>
              {/* Campo Nome */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Nome
                </label>
                <input
                  type="text"
                  placeholder="Nome completo"
                  value={editForm.nome}
                  onChange={(e) => setEditForm({...editForm, nome: e.target.value})}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              
              {/* Campo Email */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Email de contato"
                  value={editForm.email}
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              
              {/* Campo Setor (Bloqueado) */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Setor
                </label>
                <input
                  type="text"
                  value={currentAvaliador.especialidade}
                  disabled
                  className="w-full rounded border-[1.5px] border-stroke bg-gray-100 py-3 px-5 font-medium outline-none cursor-not-allowed text-gray-500 dark:border-form-strokedark dark:bg-gray-800 dark:text-gray-400"
                />
              </div>
              
              {/* Campo Telefone (Bloqueado - Unidade) */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Unidade
                </label>
                <input
                  type="text"
                  value={currentAvaliador.telefone}
                  disabled
                  className="w-full rounded border-[1.5px] border-stroke bg-gray-100 py-3 px-5 font-medium outline-none cursor-not-allowed text-gray-500 dark:border-form-strokedark dark:bg-gray-800 dark:text-gray-400"
                />
              </div>
              
              {/* Campo Status (Editável) */}
              <div className="mb-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  Status
                </label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({...editForm, status: e.target.value as 'Ativo' | 'Inativo'})}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </div>
            </>
          )}

          <div className="flex justify-end gap-3">
            <Button 
              variant="outline" 
              onClick={closeEditModal}
            >
              Cancelar
            </Button>
            <Button 
              variant="primary"
              onClick={handleEditSave}
            >
              Salvar Alterações
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Avaliador;