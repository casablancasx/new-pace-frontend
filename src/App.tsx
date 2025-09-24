import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";

// Import novas páginas
import Avaliador from "./pages/Avaliador";
import CadastrarAvaliador from "./pages/CadastrarAvaliador";
import Pautista from "./pages/Pautista";
import CadastrarPautista from "./pages/CadastrarPautista";
import CadastroAdvogadoPrioritarios from "./pages/CadastroAdvogadoPrioritarios";
import ConsultarAdvogados from "./pages/ConsultarAdvogados";
import Pautas from "./pages/Pautas";
import CadastroPautaManual from "./pages/CadastroPautaManual";
import GerenciarPautas from "./pages/GerenciarPautas";
import Audiencias from "./pages/Audiencias";
import EscalaPautista from "./pages/EscalaPautista";
import EscalarAvaliador from "./pages/EscalarAvaliador";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />

            {/* Novas Páginas do Projeto */}
            <Route path="/avaliador" element={<Avaliador />} />
            <Route path="/cadastrar-avaliador" element={<CadastrarAvaliador />} />
            <Route path="/pautista" element={<Pautista />} />
            <Route path="/cadastrar-pautista" element={<CadastrarPautista />} />
            <Route path="/cadastro-advogado-prioritarios" element={<CadastroAdvogadoPrioritarios />} />
            <Route path="/consultar-advogados" element={<ConsultarAdvogados />} />
            <Route path="/pautas" element={<Pautas />} />
            <Route path="/cadastro-pauta-manual" element={<CadastroPautaManual />} />
            <Route path="/gerenciar-pautas" element={<GerenciarPautas />} />
            <Route path="/audiencias" element={<Audiencias />} />
            <Route path="/escala-pautista" element={<EscalaPautista />} />
            <Route path="/escalar-avaliador" element={<EscalarAvaliador />} />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
