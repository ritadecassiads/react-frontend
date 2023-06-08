import { useState, useEffect } from "react";
import api from "../services/api";
import Select from "react-select";

function CadastrarTarefa() {
  // ja inicializo o hook montando o objeto vazio para poder usar no if que renderiza os botões ou os formulario
  const [tarefa, setTarefa] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [equipe, setEquipe] = useState(null);

  // para recuperar as listas para o select
  const [tarefas, setTarefas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [equipes, setEquipes] = useState([]);

  const [tarefasSelecionadas, setTarefasSelecionadas] = useState([]);

  // const selectStyles = {
  //   control: (baseStyles, state) => ({
  //     ...baseStyles,
  //     margin: 0,
  //     padding: "5px 0",
  //     borderRadius: 3,
  //     borderColor: "gray",
  //     boxShadow: state.isFocused ? "0 0 0 2px black" : 0,
  //     ":hover": { borderColor: "black" },
  //   }),
  // };

  function salvarTarefa(){
    api.post("/tarefas/salvar", tarefa).then((response) => {
        alert(response.data.message)
        reiniciarEstadoDosObjetos()

    }).catch((err) => {
        alert("Ocorreu um erro ao cadastrar a tarefa")
        console.error("Erro ao salvar tarefa ------>" + err);
      });
  }

  function salvarUsuario(){
    api.post("/usuarios/cadastro", usuario).then((response) => {
        alert(response.data.message)
        reiniciarEstadoDosObjetos()

    }).catch((err) => {
        alert("Ocorreu um erro ao cadastrar usuario")
        console.error("Erro ao cadastrar usuario ------>" + err);
      });
  }

  function salvarEquipe(){
    api.post("/equipe/salvar", usuario).then((response) => {
        alert(response.data.message)
        reiniciarEstadoDosObjetos()

    }).catch((err) => {
        alert("Ocorreu um erro ao cadastrar equipe")
        console.error("Erro ao cadastrar equipe ------>" + err);
      });
  }

  function getTarefas() {
    api.get("/tarefas/listar").then((response) => {
      setTarefas(response.data);
    }).catch((err) => {
        alert("Ocorreu um erro ao listar as tarefas")
        console.error("Erro ao listar tarefas ------>" + err);
      });
  }

  function getUsuarios() {
    api.get("/usuarios/listar").then((response) => {
      setUsuarios(response.data);
    }).catch((err) => {
        alert("Ocorreu um erro ao listar usuarios")
        console.error("Erro ao listar usuarios ------>" + err);
      });
  }

  function getEquipes() {
    api.get("/equipe/listar").then((response) => {
      setEquipes(response.data);
    }).catch((err) => {
        alert("Ocorreu um erro ao listar equipes")
        console.error("Erro ao listar equipes ------>" + err);
      });
  }

  useEffect(() => {
    getTarefas()
    getUsuarios()
  }, [])
  
  useEffect(() => {
    if(tarefas && usuarios){
      getEquipes()
      console.log("passou pelo useEffect das equipes")
    }
  }, [])

  function reiniciarEstadoDosObjetos(){
    setTarefa(null)
    setUsuario(null)
    setEquipe(null)
  }
  function getSelectTarefas() {
    return (
      <div>
          <select 
            name="tarefa" 
            value={tarefa} 
            onChange={(e) => {
              handleSelectTarefas(e)
            }}  
            >
            {tarefas.map((t) => {
              <option value={t.idTarefa} key={t.idTarefa}>{t.titulo}</option>
            })}

          </select>
      </div>
    )
  }


  function handleSelectTarefas(e) {
    setEquipe({
      ...equipe,
      tarefa: {
        idTarefa: e.target.value,
        titulo: e.target.options[e.target.selectedIndex].text,
      }
    })
  }


  // function getSelectTarefas() {
  //   // percorro o array de tarefas para verificar se em algum equipe ja possui a tarefa
  //   const tarefasAnteriores = tarefas.map(tarefa => {
  //     if (equipes.tarefa.includes(tarefa.idTarefa)) {
  //       return {
  //         value: tarefa._id,
  //         label: tarefa.titulo,
  //       };
  //     }
  //     return null;
  //     // para remover os elementos null do array resultante
  //   }).filter(tarefa => tarefa !== null);
  
  //   const vetorTarefas = tarefas.map(tarefa => ({
  //     value: tarefa.idTarefa,
  //     label: tarefa.titulo,
  //   }));
  
  //   return (
  //     <Select
  //       isMulti
  //       isClearable={false}
  //       value={tarefasSelecionadas}
  //       defaultValue={tarefasAnteriores}
  //       onChange={onChangeSelectTarefas}
  //       options={vetorTarefas}
  //       styles={selectStyles}
  //     />
  //   );
  // }

  // function onChangeSelectTarefas(valores) {
  //   setTarefasSelecionadas(valores);
  //   const tarefasIds = valores.map(valor => valor.value);
  //   alterarEquipe("tarefa", tarefasIds, equipe.idEquipe);
  // }

  function inicializaTarefa() {
    setTarefa({
      titulo: "",
      descricao: "",
      data_conclusao: "",
      feito: false
    })
  }

  function inicializaUsuario() {
    setUsuario({
      nome: "",
      username: "",
      senha: "",
      email: "",
      telefone: ""
    })
  }

  function inicializaEquipe() {
    setEquipe({
      tarefa: "",
      integrantes: []
    })
  }

  // function alterarEquipe(campo, valor, id) {
  //   equipe[campo] = valor;
  //   setEquipe({
  //     idEquipe: id,
  //     ...equipe,
  //   });
  // }

  const handleChangeUsuario= (e) => {
    const { name, value } = e.target;
    setUsuario((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

    const handleChangeEquipe = (e) => {
    const { name, value } = e.target;
    setUsuario((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // preciso chamar a função que altera o valor do campo em tempo real pra mostrar na tela, caso contrario nao deixa digitar
  // responsável por atualizar o estado tarefa sempre que um campo de entrada do formulário é alterado
  const handleChangeTarefa = (e) => {
    // pega o name(titulo, descricao, data...) e o value(o que o usuario digitar no input) e vou setando nos campos da tarefa
    const { name, value } = e.target;
    // recebe o estado anterior (prevState) e retorna um novo estado atualizado
    setTarefa((prevState) => ({
      // utilizamos o operador de propagação (...prevState) para copiar todas as propriedades existentes do objeto tarefa anterior
      ...prevState,
      [name]: value
    }));
  };

  function getFormularioEquipe() {
    return (
      <form>
            <label for="tarefa">Tarefa:</label>
            {getSelectTarefas()}
            {/* <input
              type="text" 
              name="tarefa"
              value={equipe.tarefa}
              onChange={(e) => {
                handleChangeTarefa(e)
              }}
              /> */}
            <br />
            <label for="integrantes">Integrantes:</label>
            <input 
              type="text" 
              name="integrantes" 
              value={equipe.integrantes}
              onChange={(e) => {
                handleChangeEquipe(e)
              }}
              />
               <br /> <br />
            <button 
              class="button-cancelar"
              onClick={() => {
                setEquipe(null)
              }}>Cancelar</button>
            <button 
              type="button"
            onClick={() => {
              salvarEquipe()
            }}>Salvar</button>
            <br />
        </form>
    )
  }

  function getFormularioUsuario() {
    return (
      <form>
            <label for="nome">Nome:</label>
            <input
              type="text" 
              name="nome"
              value={usuario.nome}
              onChange={(e) => {
                handleChangeUsuario(e)
              }}
              />
            <br />
            <label for="username">Username:</label>
            <input 
              type="text" 
              name="username" 
              value={usuario.username}
              onChange={(e) => {
                handleChangeUsuario(e)
              }}
              />
            <br />
            <label for="senha">Senha:</label>
            <input
              type="password" 
              name="senha"
              value={usuario.senha}
              onChange={(e) => {
                handleChangeUsuario(e)
              }}
               />
             <br />
              <label for="email">Email:</label>
              <input
                type="text" 
                name="email"
                value={usuario.email}
                onChange={(e) => {
                  handleChangeUsuario(e)
                }}
               />
              <br />
              <label for="telefone">Telefone:</label>
              <input
                type="text" 
                name="telefone"
                value={usuario.telefone}
                onChange={(e) => {
                  handleChangeUsuario(e)
                }}
               />
               <br /> <br />
            <button 
              class="button-cancelar"
              onClick={() => {
                setTarefa(null)
              }}>Cancelar</button>
            <button 
              type="button"
            onClick={() => {
              salvarUsuario()
            }}>Salvar</button>
            <br />
        </form>
    )
  }

  function getFormularioTarefa() {
    return (
      <form>
            <label for="titulo">Titulo:</label>
            <input 
            required
              type="text" 
              name="titulo"
              value={tarefa.titulo}
              // enquanto o usuario digita altero o estado do campo titulo atraves do setTarefa 
              onChange={(e) => {
                handleChangeTarefa(e)
              }}
              />
            <br />
            <label for="descricao">Descricao:</label>
            <input 
              type="text" 
              name="descricao" 
              value={tarefa.descricao}
              onChange={(e) => {
                handleChangeTarefa(e)
              }}
              />
            <br />
            <label for="dataConclusao">Data de conclusão:</label>
            <input
              placeholder="YYYY-MM-DD"
              type="text" 
              name="data_conclusao"
              value={tarefa.data_conclusao}
              onChange={(e) => {
                handleChangeTarefa(e)
              }}
               />
               <br /> <br />
            <button 
              class="button-cancelar"
              onClick={() => {
                setTarefa(null)
              }}>Cancelar</button>
            <button 
              type="button"
            onClick={() => {
              salvarTarefa()
            }}>Salvar</button>
            <br />
        </form>
    )
  }
  
  function getFormulario() {
    if (tarefa != null) {
      return (
        <>
          {getFormularioTarefa()}
        </>
      )
    } else if(usuario != null){
      return (
        <>
          {getFormularioUsuario()}
        </>
      )
    } else if (equipe != null) {
      return (
        <>
          {getFormularioEquipe()}
        </>
      )
    }
  }

  function getConteudo() {
    if(tarefa === null && usuario === null && equipe === null){
      return(
        <div>
              <button
                class="button-cadastros"
                type="button"
                onClick={() => {
                  inicializaTarefa();
                }}>
                  Tarefa
                </button>
              <button
                class="button-cadastros"
                type="button"
                onClick={() => {
                  inicializaUsuario();
                }}
              >
                Usuario
              </button>
              <button
              class="button-cadastros"
              type="button"
              onClick={() => {
                inicializaEquipe()
              }}
              >
                Equipe
              </button>
        </div>
      )
    } else {
      return (
        <>
          {getFormulario()}
        </>
      )
    }
  }

  return (
    <div class="div-pai">
        <h2>Aréa de cadastro</h2>
        <br />
        {getConteudo()}
    </div>
  );
}

export default CadastrarTarefa;
