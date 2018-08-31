let nextId = 0;

module.exports = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                ...state,
                todos: [...(state.todos || []), {
                    id: nextId++,
                    completed: false,
                    text: action.payload
                }],
                filteredTodos: [...(state.todos || []), {
                    id: nextId++,
                    completed: false,
                    text: action.payload
                }],
                filter: 'ALL'
            };
        case 'REMOVE_TODO':
            const todos = (state.todos || []).filter(todo => todo.id !== action.payload);

            return {
                ...state,
                todos: todos,
                filteredTodos: todos.filter(getFilterPredicate(state.filter)),
                filter: state.filter
            };
        case 'TOGGLE_TODO':
            return {
                ...state,
                todos: (state.todos || []).map(todo => todo.id === action.payload ?
                    {...todo, completed: !todo.completed} : todo)
            };
        case 'FILTER_TODOS':
            return {
                ...state,
                filteredTodos: (state.todos || []).filter(getFilterPredicate(action.payload)),
                filter: action.payload
            };
        default:
            return state;
    }
};


function getFilterPredicate(filterId){
    switch (filterId) {
        case 'ALL':
            return () => true;
        case 'COMPLETED':
            return todo => todo.completed;
        case 'NOT_COMPLETED':
            return todo => !todo.completed;
        default:
            throw new Error(`Filter not supported: '${filterId}'`);
    }
}

