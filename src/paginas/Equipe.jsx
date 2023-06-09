import { useState, React, useEffect } from "react";
import api from "../services/api";

// em andamento...
function Equipe() {
  const [equipe, setEquipe] = useState(null)
  const [listaEquipe, setListaEquipes] = useState([])

  function getEquipes() {
    api.get("/equipe/listar").then((response) => {
      setListaEquipes(response.data);

    }).catch((err) => {
      alert("Ocorreu um erro ao listar equipes")
      console.error("Erro ao listar equipes ------>" + err);
    });
  }

  useEffect(() =>{
    getEquipes()
  }, [])

  function getInfos() {
    return listaEquipe.map((equipe) => {
      return (
        <tr>
          <td>
            {equipe.tarefa.titulo}
          </td>
          <td>{equipe.integrantes.nome}</td>
          <td>
          </td>
        </tr>
      );
    });
  }

  function mostraEquipes() {
    return (
      <div class="div-tarefas">
        <table class="table1">
          <thead>
            <tr class="tr-tarefas-concluidas">
              <th>Tarefa</th>
              <th>Integrantes</th>
            </tr>
          </thead>
          <tbody>
            {getInfos()}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div class="div-pai">
      <h2>Equipes</h2>
      <div>
        <p>Em andamento...</p>
        {mostraEquipes()}
      </div>
    </div>
  )

}

export default Equipe;