import { useState, useEffect } from "react";
import api from "../services/api";

function Lista(){
    // lista de tarefas que vem do get 
    const [tarefas, setTarefas] = useState([]);
    // uma unica tarefa alterada pelo botao editar e enviada no put
    const [tarefa, setTarefa] = useState(null);
  
  function getTarefas() {
    api.get("/tarefas/listar").then((response) => {
      setTarefas(response.data);
    }).catch((err) => {
        alert("Ocorreu um erro ao listar as tarefas")
        console.error("Erro ao listar tarefas ------>" + err);
      });
  }

  function alterarTarefa(){
    api.put("/tarefas/atualizar/" + tarefa.idTarefa, tarefa).then((response) => {
      if (tarefa.feito === true) {
        alert("Tarefa concluída com sucesso!")
      } else {
        alert(response.data.message)
      }

      setTarefa(null)
    }).catch((err) => {
        alert("Ocorreu um erro ao alterar a tarefa")
        console.error("Erro ao alterar tarefa ------>" + err);
      });
  }

  function excluirTarefa(id) {
    api.delete("/tarefas/excluir/" + id).then((response) => {
      // alert(response.data.message)

  }).catch((err) => {
      alert("Ocorreu um erro ao excluir a tarefa")
      console.error("Erro ao excluir tarefa ------>" + err);
    });
  }

  useEffect(() => {
    getTarefas()
  }, []);

  function formatarData(dataString) {
    const data = new Date(dataString) ;
    const dia = data.getDate() + 1;
    const mes = data.getMonth() + 1; // Os meses são indexados de 0 a 11
    const ano = data.getFullYear();
  
    const dataFormatada = `${dia}-${mes}-${ano}`;
  
    return dataFormatada;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTarefa((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  function limpaTarefasFeitas() {
    tarefas.map((tarefa) => {
      if(tarefa.feito === true){
        excluirTarefa(tarefa.idTarefa)
      }
    })
    alert("Concluídas limpas com sucesso!")
  }

  function getFormulario(){
      return (
        <form>
          <br />
        {/* enquanto o usuario digita altero o estado do campo titulo atraves do handleChange() */}
              <label for="titulo">Titulo: </label>
              <input 
                class="input-tarefa"
                type="text" 
                name="titulo"
                value={tarefa.titulo}
                onChange={(e) => {
                  handleChange(e)
                }}
                />
              <br />
              <label for="descricao">Descricao: </label>
              <input 
                class="input-tarefa"
                type="text" 
                name="descricao" 
                value={tarefa.descricao}
                onChange={(e) => {
                  handleChange(e)
                }}
                />
              <br />
              <label for="dataConclusao">Data de conclusão: </label>
              <input 
                class="input-tarefa"
                type="text" 
                name="data_conclusao"
                value={tarefa.data_conclusao}
                onChange={(e) => {
                  handleChange(e)
                }}
                 />
                 <br /> <br />
              <button 
              onClick={() => {
                alterarTarefa()
              }}>Salvar</button>
             
              <button 
              class="button-cancelar"
              onClick={() => {
                // seto a tarefa como null pra entrar a condição que mostra a listagem
                setTarefa(null)
              }}>Cancelar</button>
              <button
              class="button-concluida"
              type="button" 
              onClick={() => {
                tarefa.feito = true;
                alterarTarefa()
              }}>Concluir</button>
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
                {tarefa.titulo}
            </td>
            <td>{tarefa.descricao}</td>
            <td>
              {formatarData(tarefa.data_conclusao)}
              <button
                class="button-excluir"
                type="button"
                onClick={() => {
                  if (
                    window.confirm(
                      "Confirmar a exclusão da tarefa " + " ' " + tarefa.titulo + " ' " + "?"
                    )
                  ) {
                    excluirTarefa(tarefa.idTarefa);
                    alert("Tarefa excluída com sucesso")
                  }
                }}
                >
                Excluir
              </button>

              <button
                class="button-editar"
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

  function getTarefasFeitas() {
    return tarefas.map((tarefa) => {
      if (tarefa.feito === true) {
        return (
          <tr class="tr-tarefas-concluidas">
            <td class="tarefa-concluida">
                {tarefa.titulo}
            </td>
          </tr>
          )    
      }
    })
  }

  function mostraTarefas() {
    return (
      <div class="div-tarefas">
        <table class="table1">
          <thead>
              <tr class="tr-tarefas-concluidas">
                  <th>Titulo</th>
                  <th>Descrição</th>
                  <th>Data de conclusão</th>
              </tr>
          </thead>
          <tbody>
              {tarefas.length === 0 ? <p>Não há tarefas cadastradas</p> : getInfos()}

          </tbody>
        </table>

        <table class="table2">
        <thead>
            <tr class="tr-tarefas-concluidas">
                <th class="">Concluídas</th>
            </tr>
        </thead>
        <tbody>
            {getTarefasFeitas()}
            {
              tarefas.length === 0 ? <><p></p></> : 
            
            <tr>
              <button
                class="button-limpar"
                type="button"
                name="limpar"
                onClick={() => {
                  limpaTarefasFeitas()
              }}
              >Limpar</button>
            </tr>
            }
        </tbody>
        </table>
      </div>
    )
  }

    return (
      <div class="div-pai">
        <h2>Tarefas</h2>
        <div>
          {/* quando a tarefa for null(vem por padrao assim que carrega a tela) traz a lista, quando não(é pq foi clicado no botao editar) e aí renderiza o formulario de alteração */}
          {tarefa === null ? mostraTarefas() : getFormulario()}
        </div>
      </div>
    )
}

export default Lista;