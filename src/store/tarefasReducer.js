import axios from 'axios'

const http = axios.create({
    baseURL: 'https://minhastarefas-api.herokuapp.com'
})

const ACTIONS = {
    lISTAR: 'TAREFAS_LISTA',
    REMOVER: 'TASKS_REMOVE',
    ADD: 'TASKS_ADD',
    STATUS: 'STATUS'
}

const ESTADO_INICIAL = {
    tarefas: [],
    quantidade: 0
}

export const tarefaReducer = (state = ESTADO_INICIAL, action) => {
    switch (action.type) {
        case ACTIONS.lISTAR:
            return { ...state, 
                tarefas: action.tarefas, 
                quantidade: action.tarefas.length 
            }
        case ACTIONS.ADD:
            const lista = [...state.tarefas, action.tarefa] 
            return { ...state, 
                tarefas: lista,
                quantidade: lista.length
            }
        case ACTIONS.REMOVER:
            const id = action.id
            const tarefas = state.tarefas.filter(tarefa => tarefa.id !== id)
            return { ...state, 
                tarefas: tarefas,
                quantidade: tarefas.length
             }
            
        case ACTIONS.STATUS:
            const listaUpdated = [...state.tarefas]
            lista.forEach(tarefa => {
                if (tarefa.id === action.id) {
                    tarefa.done = true;
                }
            })
            return {...state, tarefas: listaUpdated }
        default:
            return state;
    }
}

export function listar() {
    return dispatch => {
        http.get('/tarefas', {
            headers: { 'x-tenant-id': localStorage.getItem('usuario_logado') }
        }).then(response => {
            dispatch({
                type: ACTIONS.lISTAR,
                tarefas: response.data
            })
        })
    }
}

export function salvar(tarefa) {
    return dispatch => {
        http.post('/tarefas', tarefa, {
            headers: { 'x-tenant-id': localStorage.getItem('usuario_logado') }
        }).then(response => {
            dispatch({
                type: ACTIONS.ADD,
                tarefa: response.data
            })
        })
    }
}

export function deletar(id) {
    return dispatch => {
        http.delete(`/tarefas/${id}`, {
            headers: { 'x-tenant-id': localStorage.getItem('usuario_logado') }
        }).then(response => {
            dispatch({
                type: ACTIONS.REMOVER,
                id: id
            })
        })
    }
}

export function alterarStatus(id) {
    return dispatch => {
        http.patch(`/tarefas/${id}`, null, {
            headers: { 'x-tenant-id': localStorage.getItem('usuario_logado') }
        }).then(response => {
            dispatch({
                type: ACTIONS.STATUS,
                id: id
            })
        })
    }
}
