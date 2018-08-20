let nextId = 0;

module.exports = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                ...state,
                todos: [...(state.todos || []), {
                    id: nextId++,
                    text: action.payload
                }]
            };
        case 'REMOVE_TODO':
            return {
                ...state,
                todos: (state.todos || []).filter(todo => todo.id !== action.payload)
            };
        default:
            return state;
    }
};

