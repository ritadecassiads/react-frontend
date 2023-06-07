import { useState, useEffect } from "react";
import api from "../services/api";

function ListaTarefas() {
  // lista de tarefas que vem do get 
  const [tarefas, setTarefas] = useState([]);
  // uma unica tarefa alterada pelo botao editar e enviada no put
  const [tarefa, setTarefa] = useState(null);
  // tarefa com o campo de "feito" alterado
  const [tarefaFeita, setTarefaFeita] = useState({
    idTarefa: '',
    titulo: '',
    descricao: '',
    data_conclusao: '',
    feito: ''
  });

  function getTarefas() {
    api.get("/tarefas/listar").then((response) => {
      setTarefas(response.data);
    }).catch((err) => {
      alert("Ocorreu um erro ao listar as tarefas")
      console.error("Erro ao listar tarefas ------>" + err);
    });
  }

  function alterarTarefa() {
    api.put("/tarefas/atualizar", tarefa).then((response) => {
      alert(response.data.message)

    }).catch((err) => {
      alert("Ocorreu um erro ao alterar a tarefa")
      console.error("Erro ao alterar tarefa ------>" + err);
    });
  }

  function alterarTarefaFeita() {
    api.put("/tarefas/atualizar/" + tarefaFeita.idTarefa + "/done", tarefaFeita).then((response) => {
      alert(response.data.message)

    }).catch((err) => {
      alert("Ocorreu um erro ao concluir tarefa")
      console.error("Erro ao concluir tarefa ------>" + err);
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

  // altero so o campo feito da tarefa
  function checkTarefaFeita(id, titulo, descricao, data) {
    let decisao = prompt("deseja excluir a tarefa? ")

    if(decisao === "sim"){
      setTarefaFeita({
        idTarefa: id,
        titulo: titulo,
        descricao: descricao,
        data_conclusao: data,
        feito: true
      })
      // chamo a função que faz o put no banco e altero feito para true
      alterarTarefaFeita()
    }
    
    console.log(tarefaFeita)


  };

  function getFormulario() {
    return (
      <form>
        <label for="titulo">Titulo</label>
        <input
          type="text"
          name="titulo"
          value={tarefa.titulo}
          // enquanto o usuario digita altero o estado do campo titulo atraves do handleChange() 
          onClick={(e) => {
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
          alterarTarefa()
        }}>Salvar</button>
        <br />
        <button onClick={() => {
          // seto a tarefa como null pra entrar na condição que mostra a listagem
          setTarefa(null)
        }}>Cancelar</button>
      </form>
    )
  }

  function getTarefasAFazer() {
    // percorre o array(possui o for internamente)
    return tarefas.map((tarefa) => {
      if (tarefa.feito === false) {
        return (
          <tr>
            <td>
              <input
                id="checkBox"
                class="checkBox"
                type="checkbox"
                name="feito"
                onChange={(e) => {
                  checkTarefaFeita(tarefa.idTarefa, tarefa.titulo, tarefa.descricao, tarefa.data)
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

  function getTarefasFeitas() {
    // percorre o array(possui o for internamente)
    return tarefas.map((tarefa) => {
      if (tarefa.feito === true) {
        return (
          <tr>
            <td>
              <input
                id="checkBox"
                class="checkBox"
                type="checkbox"
                name="feito"
                checked
                onChange={(e) => {

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
            </td>
          </tr>
        );
      }
    });
  }

  function mostraTarefas() {
    return (
      <>
        <fieldset>
          <legend>A fazer:</legend>
          <tr>
            <th>Titulo</th>
            <th>Descrição</th>
            <th>Data de conclusão</th>
          </tr>
          {getTarefasAFazer()}
        </fieldset>
        <fieldset>
          <legend>Feitas:</legend>
          <tr>
            <th>Titulo</th>
            <th>Descrição</th>
          </tr>
          {getTarefasFeitas()}
        </fieldset>
      </>

    )
  }

  return (
    <div>
      <h2>Tarefas</h2>
      <div>
        {/* quando a tarefa for null(vem por padrao assim que carrega a tela) traz a lista, quando não(é pq foi clicado no botao editar) e aí renderiza o formulario de alteração */}
        {tarefa == null ? mostraTarefas() : getFormulario()}
      </div>
    </div>
  )
}

export default ListaTarefas;