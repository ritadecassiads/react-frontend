import { useState, useEffect } from "react";
import api from "../services/api";

function ListaTarefas(){
    const [tarefas, setTarefas] = useState([]);
  
  // get
  function getTarefas() {
    api.get("/tarefas/listar").then((response) => {
      setTarefas(response.data);
    }).catch((err) => {
        alert("Ocorreu um erro ao listar as tarefas")
        console.error("Erro GET ------>" + err);
      });
  }

  useEffect(getTarefas, []);

  function formatarData(dataString) {
    const data = new Date(dataString);
    const dia = data.getDate();
    const mes = data.getMonth() + 1; // Os meses são indexados de 0 a 11
    const ano = data.getFullYear();
  
    const dataFormatada = `${dia}/${mes}/${ano}`;
  
    return dataFormatada;
  }

  function getInfos() {
    // formatar a data para mostrar na tela
    return tarefas.map((tarefa) => {
      if(tarefa.feito === false){
        return (
          <tr>
            <td>{tarefa.titulo}</td>
            <td>{tarefa.descricao}</td>
            <td>{formatarData(tarefa.data_conclusao)}</td>
          </tr>
        );
      }
    });
  }

  function mostraTarefas() {
    return (
        <table>
            <tr>
                <th>Titulo</th>
                <th>Descrição</th>
                <th>Data de conclusão</th>
            </tr>
            {getInfos()}
        </table>
    )
  }

    return (
      <div>
        <h2>Tarefas a fazer</h2>
        <div>
          {mostraTarefas()}

        </div>
      </div>
    )
}

export default ListaTarefas;