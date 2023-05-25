import { useState, useEffect } from "react";
import api from "../services/api";

function CadastrarTarefa() {
  const [tarefas, setTarefas] = useState([]);

  function postTarefa(){
    let titulo = document.querySelector('#titulo').value
    let descricao = document.querySelector('#descricao').value
    let data = document.querySelector('#dataConclusao').value
    let resultado = document.querySelector('#resultado')

    api.post("/tarefas/salvar", {
        titulo: titulo,
        descricao: descricao,
        data_conclusao: data
    }).then((response) => {
        console.log("cadastrooooooou ----->", response.data)
        alert(response.data.message)

        // resultado.innerText = `Titulo: ${response.data.titulo}`

    }).catch((err) => {
        alert("Ocorreu um erro ao cadastrar a tarefa")
        console.error("Erro POST ------>" + err);
      });
  }

  return (
    <div>
        <h1>Cadastro de Tarefa</h1>
        <form>
            <label for="titulo">Titulo</label>
            <input type="text" id="titulo" name="titulo" />
            <br />
            <label for="descricao">Descricao</label>
            <input type="text" id="descricao" name="descricao" multiple />
            <br />
            <label for="dataConclusao">Data de conclusão</label>
            <input type="text" id="dataConclusao" name="dataConclusao" />
            <button onClick={postTarefa}>Salvar</button>
            <br />
            <p id="resultado"></p>
        </form>
    </div>
  );
}

export default CadastrarTarefa;
