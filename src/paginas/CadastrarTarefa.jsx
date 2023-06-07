import { useState, useEffect } from "react";
import api from "../services/api";

function CadastrarTarefa() {
  // ja inicializo o hook montando o objeto vazio
  const [tarefa, setTarefa] = useState({
    titulo: "",
    descricao: "",
    data_conclusao: "",
    feito: false
  });

  function salvarTarefa(){
    api.post("/tarefas/salvar", tarefa).then((response) => {
        alert(response.data.message)

    }).catch((err) => {
        alert("Ocorreu um erro ao cadastrar a tarefa")
        console.error("Erro ao salvar tarefa ------>" + err);
      });
  }

  // preciso chamar a função que altera o valor do campo em tempo real pra mostrar na tela, caso contrario nao deixa digitar
  // responsável por atualizar o estado tarefa sempre que um campo de entrada do formulário é alterado
  const handleChange = (e) => {
    // pega o name(titulo, descricao, data...) e o value(o que o usuario digitar no input) e vou setando nos campos da tarefa
    const { name, value } = e.target;
    // recebe o estado anterior (prevState) e retorna um novo estado atualizado
    setTarefa((prevState) => ({
      // utilizamos o operador de propagação (...prevState) para copiar todas as propriedades existentes do objeto tarefa anterior
      ...prevState,
      [name]: value
    }));
    console.log(tarefa)
  };

  function getFormulario() {
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
        </form>
    )
  }

  return (
    <div>
        <h1>Cadastro de Tarefa</h1>
        {getFormulario()}        
    </div>
  );
}

export default CadastrarTarefa;
