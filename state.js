let nextId = 0;

const FILTER_ALL = 'ALL';
const FILTER_COMPLETED = 'COMPLETED';
const FILTER_NOT_COMPLETED = 'NOT_COMPLETED';

exports.FILTER_ALL = FILTER_ALL;
exports.FILTER_COMPLETED = FILTER_COMPLETED;
exports.FILTER_NOT_COMPLETED = FILTER_NOT_COMPLETED;

exports.reducer = (state = {}, action) => {
    let todos;
    let filter;

    switch (action.type) {
        case 'ADD_TODO':
            todos = [...(state.todos || []), {
                id: nextId++,
                completed: false,
                text: action.payload
            }];
            filter = state.filter || FILTER_ALL;

            return createState(todos, filter);
        case 'REMOVE_TODO':
            todos = (state.todos || []).filter(todo => todo.id !== action.payload);
            filter = state.filter;

            return createState(todos, filter);
        case 'REMOVE_COMPLETED_TODOS':
            todos = (state.todos || []).filter(todo => todo.completed === false);
            filter = state.filter;

            return createState(todos, filter);
        case 'TOGGLE_TODO':
            todos = (state.todos || []).map(todo => todo.id === action.payload ?
                {...todo, completed: !todo.completed} : todo);
            filter = state.filter;

            return createState(todos, filter);
        case 'TOGGLE_ALL':
            todos = (state.todos || []).map(todo => todo.completed === false ?
                {...todo, completed: !todo.completed} : todo);
            filter = state.filter;

            return createState(todos, filter);
        case 'FILTER_TODOS':
            todos = state.todos || [];
            filter = action.payload;

            return createState(todos, filter);
        default:
            return state;
    }
};

function createState(todos, filter) {
    return {
        todos,
        filter,
        filteredTodos: getFilteredTodos(todos, filter)
    };
}

function getFilteredTodos(todos, filter) {
    return todos.filter(getFilterPredicate(filter));
}

function getFilterPredicate(filterId) {
    switch (filterId) {
        case FILTER_ALL:
            return () => true;
        case FILTER_COMPLETED:
            return todo => todo.completed;
        case FILTER_NOT_COMPLETED:
            return todo => !todo.completed;
        default:
            throw new Error(`Filter not supported: '${filterId}'`);
    }
}

