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
