import PageMeta from "../components/common/PageMeta";

const CadastroPautaManual = () => {
  return (
    <>
      <PageMeta 
        title="Cadastro Pauta Manual" 
        description="Cadastro manual de pautas no sistema" 
      />
      <div className="mb-6">
        <h2 className="text-title-xl2 font-bold text-black dark:text-white">
          Cadastro Pauta Manual
        </h2>
      </div>

      <div className="rounded-sm border border-stroke bg-white p-10 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-col gap-9">
          <h3 className="text-lg font-bold">
            Formulário de Cadastro de Pauta
          </h3>
          <div className="p-6.5">
            <form action="#">
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Título da Pauta
                </label>
                <input
                  type="text"
                  placeholder="Digite o título da pauta"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Data da Audiência
                  </label>
                  <input
                    type="date"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Horário
                  </label>
                  <input
                    type="time"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Local
                </label>
                <input
                  type="text"
                  placeholder="Digite o local da audiência"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Advogado Responsável
                </label>
                <select className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                  <option value="">Selecione um advogado</option>
                  <option value="1">Pedro Almeida - OAB/SP 123456</option>
                  <option value="2">Luiza Costa - OAB/SP 789012</option>
                </select>
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Descrição
                </label>
                <textarea
                  rows={4}
                  placeholder="Digite a descrição da pauta"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                ></textarea>
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Documentos Relacionados
                </label>
                <input
                  type="file"
                  multiple
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
              </div>

              <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                Cadastrar Pauta
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CadastroPautaManual;