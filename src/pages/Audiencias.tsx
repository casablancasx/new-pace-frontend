import PageMeta from "../components/common/PageMeta";

const Audiencias = () => {
  return (
    <>
      <PageMeta title="Audiências" description="Gerenciamento de audiências" />
      <div className="mb-6">
        <h2 className="text-title-xl2 font-bold text-black dark:text-white">
          Audiências
        </h2>
      </div>

      <div className="rounded-sm border border-stroke bg-white p-10 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-col gap-9">
          <h3 className="text-lg font-bold">
            Conteúdo da página Audiências
          </h3>
          <p>
            Esta é a página de gerenciamento das audiências. Aqui você poderá criar, editar e visualizar as audiências agendadas.
          </p>
        </div>
      </div>
    </>
  );
};

export default Audiencias;