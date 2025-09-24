import PageMeta from "../components/common/PageMeta";

const EscalarAvaliador = () => {
  return (
    <>
      <PageMeta title="Escalar Avaliador" description="Gerenciamento da escala de avaliadores" />
      <div className="mb-6">
        <h2 className="text-title-xl2 font-bold text-black dark:text-white">
          Escalar Avaliador
        </h2>
      </div>

      <div className="rounded-sm border border-stroke bg-white p-10 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-col gap-9">
          <h3 className="text-lg font-bold">
            Conteúdo da página Escalar Avaliador
          </h3>
          <p>
            Esta é a página de gerenciamento da escala de avaliadores. Aqui você poderá definir, editar e visualizar as escalas dos avaliadores.
          </p>
        </div>
      </div>
    </>
  );
};

export default EscalarAvaliador;