import PageMeta from "../components/common/PageMeta";

const Pautas = () => {
  return (
    <>
      <PageMeta title="Pautas" description="Gerenciamento de pautas" />
      <div className="mb-6">
        <h2 className="text-title-xl2 font-bold text-black dark:text-white">
          Pautas
        </h2>
      </div>

      <div className="rounded-sm border border-stroke bg-white p-10 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-col gap-9">
          <h3 className="text-lg font-bold">
            Conteúdo da página Pautas
          </h3>
          <p>
            Esta é a página de gerenciamento das pautas. Aqui você poderá criar, editar e visualizar as pautas do sistema.
          </p>
        </div>
      </div>
    </>
  );
};

export default Pautas;