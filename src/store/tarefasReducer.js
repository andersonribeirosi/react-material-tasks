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
            return {...state, tarefas: action.tarefas }
        default:
            return state;
    }

}