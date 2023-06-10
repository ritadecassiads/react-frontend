import { useState, React, useEffect } from "react";
import api from "../services/api";

// em andamento...
function Equipe() {
  const [equipe, setEquipe] = useState(null);
  const [tarefa, setTarefa] = useState(null);
  const [listaEquipe, setListaEquipes] = useState([]);

  function getEquipes() {
    api
      .get("/equipe/listar")
      .then((response) => {
        setListaEquipes(response.data);
      })
      .catch((err) => {
        alert("Ocorreu um erro ao listar equipes");
        console.error("Erro ao listar equipes ------>" + err);
      });
  }

  function excluirEquipe(id) {
    api
      .delete("/equipe/excluir/" + id)
      .then((response) => {
        setEquipe(null)
      })
      .catch((err) => {
        alert("Ocorreu um erro ao excluir a equipe");
        console.error("Erro ao excluir equipe------>" + err);
      });
  }

  // function alterarEquipe(equipe, idTarefa) {
  //   equipe.tarefa = tarefa;
  //   console.log("equipe e Tarefa", equipe, tarefa);

  //   api
  //     .put("/equipe/atualizar/" + equipe.idEquipe, equipe)
  //     .then((response) => {
  //       alert("Equipe concluída com sucesso!");
  //     })
  //     .catch((err) => {
  //       alert("Ocorreu um erro ao alterar equipe");
  //       console.error("Erro ao alterar equipe ------>" + err);
  //     });
  // }

  // function alterarTarefa(id, tarefa) {
  //   tarefa.feito = true;
  //   api
  //     .put("/tarefas/atualizar/" + id, tarefa)
  //     .then((response) => {
  //       alert("Tarefa concluída com sucesso!");
  //       setTarefa(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((err) => {
  //       alert("Ocorreu um erro ao alterar a tarefa");
  //       console.error("Erro ao alterar tarefa ------>" + err);
  //     });
  // }

  useEffect(() => {
    getEquipes();
  }, []);

  function contaIntegrantes(equipe) {
    let qtdIntegrantes = equipe.integrantes.length;
    return qtdIntegrantes;
  }

  function getBotoes(equipe) {
    return (
      <td>
        <button
          class="button-excluir"
          type="button"
          onClick={() => {
            if (window.confirm("Confirmar a exclusão de equipe?")) {
              excluirEquipe(equipe.idEquipe);
              alert("Equipe excluída com sucesso!");
            }
          }}
        >
          Excluir
        </button>
      </td>
    );
  }

  function getInfos() {
    return listaEquipe.map((equipe) => {
      let qtdIntegrantes = contaIntegrantes(equipe);
      return (
        <tr rowSpan={qtdIntegrantes}>
          <td>{equipe.tarefa.titulo}</td>
          <td>
            {equipe.integrantes.map((usuario, index) => (
              <li key={usuario.idUsuario}>{usuario.nome}</li>
            ))}
          </td>
          {getBotoes(equipe)}
        </tr>
      );
    });
  }

  function mostraEquipes() {
    return (
      <div className="table-container">
        <table className="equipe-table">
          <thead>
            <tr class="">
              <th>Tarefa</th>
              <th colSpan={2}>Integrantes</th>
            </tr>
          </thead>
          <tbody>
            {listaEquipe.length === 0 ? <p>Não há equipes cadastradas</p>  : getInfos()}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div>
      <h2>Equipes</h2>
      {mostraEquipes()}
    </div>
  );
}

export default Equipe;
