import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { TarefasToolbar, TarefasTable } from './components';
import axios from 'axios';

import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import { 
  listar,
  salvar 
} from '../../store/tarefasReducer'
 
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const API_URL = 'https://minhastarefas-api.herokuapp.com/tarefas'


const TarefaList = (props) => {
  const classes = useStyles();

  const [tarefas, setTarefas] = useState([]);

  const deletarTarefa = (id) => {
    axios.delete(`${API_URL}/${id}`, {
      headers : {'x-tenant-id' : localStorage.getItem('usuario_logado')}
    })
    .then(response => {
      const lista = tarefas.filter(tarefa => tarefa.id !== id)
      setTarefas(lista)
    }).catch(erro => {
      console.log(erro)
    })
  }

  const alterarStatus = (id) => {
    axios.patch(`${API_URL}/${id}`, null, {
      headers : {'x-tenant-id' : localStorage.getItem('usuario_logado')}
    }).then(response => {
      const lista = [...tarefas]
      lista.forEach(tarefa => {
        if(tarefa.id === id){
          tarefa.done = true;
        }
      })
      setTarefas(lista)
    }).catch(erro => {
      console.log(erro);
    })
  }

  useEffect(() => {
    props.listar();
  }, [])

  return (
    <div className={classes.root}>
      <TarefasToolbar salvar={props.salvar}/>
      <div className={classes.content}>
        <TarefasTable alterarStatus={alterarStatus} deleteAction={deletarTarefa} tarefas={props.tarefas} />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  tarefas: state.tarefas.tarefas
})

const mapDispatchToProps = dispatch => 
bindActionCreators({listar, salvar}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TarefaList);
