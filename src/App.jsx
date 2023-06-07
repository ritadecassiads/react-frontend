import { Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './paginas/Home';
import CadastrarTarefa from './paginas/CadastrarTarefa';
import ListaTarefas from './paginas/ListaTarefas';
import Util from './paginas/Util';
import Sobre from './paginas/Sobre';

// o element é quem vai renderizar a tela
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout><Home/></Layout>}/>
        <Route path='/cadastros' element={<Layout><CadastrarTarefa/></Layout>}/>
        <Route path='/listaTarefas' element={<Layout><ListaTarefas/></Layout>}/>
        <Route path='/util' element={<Layout><Util/></Layout>}/>
        <Route path='/sobre' element={<Layout><Sobre/></Layout>}/>
      </Routes>
    </>
  );
}

export default App;
