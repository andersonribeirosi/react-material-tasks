import axios from 'axios'

const http = axios.create({
    baseURL: 'https://minhastarefas-api.herokuapp.com'
})

const ACTIONS = {
    lISTAR: 'TAREFAS_LISTA',
    REMOVER: 'TASKS_REMOVE',
    ADD: 'TASKS_ADD'
}

const ESTADO_INICIAL = {
    tarefas: []
}

export const tarefaReducer = (state = ESTADO_INICIAL, action) => {
    switch (action.type) {
        case ACTIONS.lISTAR:
            return { ...state, tarefas: action.tarefas }
        case ACTIONS.ADD:
            return { ...state, tarefas: [...state.tarefas, action.tarefa] }
        case ACTIONS.REMOVER:
            const id = action.id
            const tarefas = state.tarefas.filter(tarefa => tarefa.id !== id)
            return {...state, tarefas: tarefas}

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