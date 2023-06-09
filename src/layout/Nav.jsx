import { NavLink } from "react-router-dom";

// dizer a rota de cada link
function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/cadastros">Cadastro</NavLink>
        </li>
        <li>
          <NavLink to="/tarefas">Tarefas</NavLink>
        </li>
        <li>
          <NavLink to="/equipes">Equipes</NavLink>
        </li>
        <li>
          <NavLink to="/sobre">Sobre</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
