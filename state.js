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
                }]
            };
        case 'REMOVE_TODO':
            return {
                ...state,
                todos: (state.todos || []).filter(todo => todo.id !== action.payload)
            };
        case 'TOGGLE_TODO':
            return {
                ...state,
                todos: (state.todos || []).map(todo => todo.id === action.payload ?
                    {...todo, completed: !todo.completed} : todo)
            };
        case 'RENDER_COMPLETED':
            return {
                ...state,
                todos: (state.todos || []).filter(todo => todo.completed === action.payload)
            };
        default:
            return state;
    }
};


