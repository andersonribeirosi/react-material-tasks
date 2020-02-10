import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { TarefasToolbar, TarefasTable } from './components';
import axios from 'axios';

import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import { 
  listar,
  salvar,
  deletar,
  alterarStatus } 
from '../../store/tarefasReducer'
 
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const TarefaList = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.listar();
  }, [])

  return (
    <div className={classes.root}>
      <TarefasToolbar salvar={props.salvar}/>
      <div className={classes.content}>
        <TarefasTable alterarStatus={props.alterarStatus} deleteAction={props.deletar} tarefas={props.tarefas} />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  tarefas: state.tarefas.tarefas
})

const mapDispatchToProps = dispatch => 
bindActionCreators({listar, salvar, deletar, alterarStatus}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TarefaList);
