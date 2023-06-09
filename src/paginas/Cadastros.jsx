import { useState, useEffect } from "react";
import api from "../services/api";
import Select from "react-select";

function Cadastros() {
  // ja inicializo o hook montando o objeto vazio para poder usar no if que renderiza os botões ou os formulario
  const [tarefa, setTarefa] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [equipe, setEquipe] = useState(null);

  // para recuperar as listas para o select
  const [listaTarefas, setListaTarefas] = useState([]); // inicio todos como um array vazio
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [listaEquipes, setListaEquipes] = useState([]);

  // para utulizar no estado do componente Select
  const [selectedTarefa, setSelectedTarefa] = useState(''); // inicio como string vazia pq preciso de so um elemento
  const [selectedUsuarios, setSelectedUsuarios] = useState([]); // inicio como array vazio pq a equipe precisa de um array de usuario

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
    api.post("/equipe/salvar", equipe).then((response) => {
        alert(response.data.message)
        reiniciarEstadoDosObjetos()

    }).catch((err) => {
        alert("Ocorreu um erro ao cadastrar equipe")
        console.error("Erro ao cadastrar equipe ------>" + err);
      });
  }

  function getTarefas() {
    api.get("/tarefas/listar").then((response) => {
      const arrayTarefas = []

      // guardo apenas as tarefas não concluídas no array
      response.data.forEach(tarefa => {
        if(tarefa.feito === false){
          arrayTarefas.push(tarefa)
        }
      });
      
      // seto as tarefas na lista
      setListaTarefas(arrayTarefas);
      
    }).catch((err) => {
        alert("Ocorreu um erro ao listar as tarefas")
        console.error("Erro ao listar tarefas ------>" + err);
      });
  }

  function getUsuarios() {
    api.get("/usuarios/listar").then((response) => {
      setListaUsuarios(response.data);

    }).catch((err) => {
        alert("Ocorreu um erro ao listar usuarios")
        console.error("Erro ao listar usuarios ------>" + err);
      });
  }

  function getEquipes() {
    api.get("/equipe/listar").then((response) => {
      setListaEquipes(response.data);

    }).catch((err) => {
        alert("Ocorreu um erro ao listar equipes")
        console.error("Erro ao listar equipes ------>" + err);
      });
  }

  // dou um get primeiro nas tarefas e usuarios
  useEffect(() => {
    getTarefas()
    getUsuarios()
  }, [])
  

  useEffect(() => {
    // se der sucesso aos lista tarefas e usuarios, dou um get na equipe
    if(listaTarefas && listaUsuarios){
      getEquipes()
    }
  }, [])

  // seto tudo como null pra voltar pra tela dos botões
  function reiniciarEstadoDosObjetos(){
    setTarefa(null)
    setUsuario(null)
    setEquipe(null)
  }

  function getSelectTarefas() {
    // guardo o elementos da lista dentro de um vetor pois o componente Select precisa dos campos value e label pra renderizar
    const vetorTarefas = listaTarefas.map(tarefa => ({
      // passo o id pq pra fazer o post da equipe preciso do id
      value: tarefa.idTarefa,
      // utilizo a label para renderizar na tela o titulo
      label: tarefa.titulo,
    }));

    // componente select do react
    return (
      <div>
        <Select
          className="select"
          options={vetorTarefas} // renderizas os itens, precisa ter value e label
          isSearchable={true} // permite digitação pra pesquisar
          value={selectedTarefa} // pra controlar o estado pelo React

          onChange={(item) => {
            // item = {value: label: } - objeto com value e label
            handleSelectTarefas(item)
          }}
        />
      </div>
    )
  }

  function getSelectUsuario() {
    const vetorUsuarios = listaUsuarios.map(usuario => ({
      value: usuario.idUsuario,
      label: usuario.nome,
    }));

    return (
      <div>

        <Select
          className="select"
          options={vetorUsuarios}
          isSearchable={true}
          value={selectedUsuarios} // por eu ter inicializado o useState como array vazio ele ja entende que é um array
          isMulti
          onChange={(itens) => {
            // itens = array de objeto com value e label
            handleSelectUsuarios(itens)
            //handleChangeEquipe()
          }}
        />
      </div>
    )
  }


  function handleSelectTarefas(item) {
    // seto no campo tarefa da equipe o item.value que tem valor do id aqui
    setSelectedTarefa(item)
    setEquipe({
      ...equipe,
      tarefa: item.value
    })
  }

  function handleSelectUsuarios(itens) {
    // seto para controle de estado do React
    setSelectedUsuarios(itens)
    // guardo no vetor só o value(determinei ali em cima que seria o idUsuario) - vetor de ids de usuario
    const vetorIntegrantes = itens.map(item => (
      item.value
    ))
    
    // com o "...equipe" pego todos os valores anteriores(tarefa por ex) e incluo o campo integrantes com um array de usuarios
    setEquipe({
      ...equipe,
      integrantes: vetorIntegrantes
    })
  }


  // pra controlar os botões, se algum dos botoes é clicado(seto os objetos com campos vazio pra deixar de ser null) e se objeto não é nulo vai renderizar seus respectivos formularios
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

  const handleChangeUsuario= (e) => {
    const { name, value } = e.target;
    setUsuario((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // preciso chamar a função que altera o valor do campo em tempo real pra mostrar na tela, controle de estado do React
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

  // formulario pra cadastrar equipe
  function getFormularioEquipe() {
    return (
      <form>
            <label for="tarefa">Selecione a tarefa:</label>
            {getSelectTarefas()}

            <br />

            <label for="integrantes">Integrantes:</label>
            {getSelectUsuario()}

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

  // formulario pra cadastrar usuario
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

  // formulario pra cadastrar tarefa
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
  
  // verifico qual dos objetos foi iniciado(atraves do botao da primeira tela) pra renderizar seu respectivo formulario
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

export default Cadastros;
