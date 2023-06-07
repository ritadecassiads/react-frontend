import { useState, useEffect } from "react";
import api from "../services/api";

function ListaTarefas(){
    const [tarefas, setTarefas] = useState([]);
    const [tarefa, setTarefa] = useState(null);
  
  function getTarefas() {
    api.get("/tarefas/listar").then((response) => {
      setTarefas(response.data);
    }).catch((err) => {
        alert("Ocorreu um erro ao listar as tarefas")
        console.error("Erro ao listar tarefas ------>" + err);
      });
  }

  function salvarTarefa(){
    api.post("/tarefas/salvar", tarefa).then((response) => {
        alert(response.data.message)

    }).catch((err) => {
        alert("Ocorreu um erro ao cadastrar a tarefa")
        console.error("Erro ao salvar tarefa ------>" + err);
      });
  }

  function alterarTarefa(){
    api.post("/tarefas/salvar", tarefa).then((response) => {
        alert(response.data.message)

    }).catch((err) => {
        alert("Ocorreu um erro ao alterar a tarefa")
        console.error("Erro ao salvar tarefa ------>" + err);
      });
  }

  useEffect(() => {
    getTarefas()
  }, []);

  function formatarData(dataString) {
    const data = new Date(dataString);
    const dia = data.getDate();
    const mes = data.getMonth() + 1; // Os meses são indexados de 0 a 11
    const ano = data.getFullYear();
  
    const dataFormatada = `${dia}/${mes}/${ano}`;
  
    return dataFormatada;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTarefa((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  function getFormulario(){
      return (
        <form>
              <label for="titulo">Titulo</label>
              <input 
                type="text" 
                name="titulo"
                value={tarefa.titulo}
                // enquanto o usuario digita altero o estado do campo titulo atraves do setTarefa 
                onChange={(e) => {
                  handleChange(e)
                }}
                />
              <br />
              <label for="descricao">Descricao</label>
              <input 
                type="text" 
                name="descricao" 
                value={tarefa.descricao}
                onChange={(e) => {
                  handleChange(e)
                }}
                />
              <br />
              <label for="dataConclusao">Data de conclusão</label>
              <input 
                type="text" 
                name="data_conclusao"
                value={tarefa.data_conclusao}
                onChange={(e) => {
                  handleChange(e)
                }}
                 />
              <button onClick={() => {
                salvarTarefa()
              }}>Salvar</button>
              <br />
              <button onClick={() => {
                setTarefa(null)
              }}>Cancelar</button>
          </form>
      )
  }

  function getInfos() {
    // percorre o array(possui o for internamente)
    return tarefas.map((tarefa) => {
      if(tarefa.feito === false){
        return (
          <tr>
            <td>
              <input type="hidden" name="idTarefa" value={tarefa.idTarefa}/>
              <input 
                type="checkbox" 
                name="feito" 
                value="true"
                onChange={(e) => {
                  handleChange(e)
                }}
                /> 
                {tarefa.titulo}
            </td>
            <td>{tarefa.descricao}</td>
            <td>
              {formatarData(tarefa.data_conclusao)}
              <button>
                Excluir
              </button>

              <button
                type="button"
                name="editar"
                onClick={() => {
                setTarefa(tarefa)
              }}
              >
                Editar
              </button>
            </td>
          </tr>
        );
      }
    });
  }

  function mostraTarefas() {
    return (
        <fieldset>
          <legend>A fazer:</legend>
            <tr>
                <th>Titulo</th>
                <th>Descrição</th>
                <th>Data de conclusão</th>
            </tr>
            {getInfos()}
        </fieldset>
    )
  }

    return (
      <div>
        <h2>Tarefas</h2>
        <div>
          {tarefa == null ? mostraTarefas() : getFormulario()}
        </div>
      </div>
    )
}

export default ListaTarefas;