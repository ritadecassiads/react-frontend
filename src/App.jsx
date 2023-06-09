import { Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './paginas/Home';
import Cadastros from './paginas/Cadastros';
import Lista from './paginas/Lista';
import Equipe from './paginas/Equipe';
import Sobre from './paginas/Sobre';

// o element é quem vai renderizar a tela
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout><Home/></Layout>}/>
        <Route path='/cadastros' element={<Layout><Cadastros/></Layout>}/>
        <Route path='/tarefas' element={<Layout><Lista/></Layout>}/>
        <Route path='/equipes' element={<Layout><Equipe/></Layout>}/>
        <Route path='/sobre' element={<Layout><Sobre/></Layout>}/>
      </Routes>
    </>
  );
}

export default App;
