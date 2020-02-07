import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { TarefasToolbar, TarefasTable } from './components';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const API_URL = 'https://minhastarefas-api.herokuapp.com/tarefas'
const headers = {'x-tenant-id' : 'andersonribeiro.sifacisa@gmail.com'}

const TarefaList = () => {
  const classes = useStyles();

  const [tarefas, setTarefas] = useState([]);

  const salvar = (tarefa) => {
    axios.post(API_URL, tarefa, {
      headers : headers
    }).then(response => {
      // listarTarefas();
      //Dessa Forma ele não faz uma nova requisição de toda a lista, apenas faz o post
      const novaTarefa = response.data
      setTarefas([...tarefas, novaTarefa])

    }).catch(erro => {
      console.log(erro);
    })
  }

  const listarTarefas = () => {
    axios.get(API_URL, {
      headers : headers
    }).then(response => {
      const listaDeTarefas = response.data
      setTarefas(listaDeTarefas)
    }).catch(erro => {
      console.log(erro);
    })
  }

  const alterarStatus = (id) => {
    axios.patch(`${API_URL}/${id}`, null, {
      headers : headers
    }).then(response => {
      console.log(response.status);
    }).catch(erro => {
      console.log(erro);
    })
  }

  useEffect(() => {
    listarTarefas();
  }, [])

  return (
    <div className={classes.root}>
      <TarefasToolbar salvar={salvar}/>
      <div className={classes.content}>
        <TarefasTable alterarStatus={alterarStatus} tarefas={tarefas} />
      </div>
    </div>
  );
};

export default TarefaList;
