import PageMeta from "../components/common/PageMeta";

const Advogados = () => {
  return (
    <>
      <PageMeta title="Advogados" description="Gerenciamento de advogados" />
      <div className="mb-6">
        <h2 className="text-title-xl2 font-bold text-black dark:text-white">
          Advogados
        </h2>
      </div>

      <div className="rounded-sm border border-stroke bg-white p-10 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-col gap-9">
          <h3 className="text-lg font-bold">
            Conteúdo da página Advogados
          </h3>
          <p>
            Esta é a página de gerenciamento dos advogados. Aqui você poderá cadastrar, editar e visualizar informações dos advogados.
          </p>
        </div>
      </div>
    </>
  );
};

export default Advogados;