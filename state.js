let nextId = 0;

const FILTER_ALL = 'ALL';
const FILTER_COMPLETED = 'COMPLETED';
const FILTER_NOT_COMPLETED = 'NOT_COMPLETED';

const ADD_TODO_ACTION = 'ADD_TODO';
const REMOVE_TODO_ACTION = 'REMOVE_TODO';
const REMOVE_COMPLETED_TODOS_ACTION = 'REMOVE_COMPLETED_TODOS';
const TOGGLE_TODO_ACTION = 'TOGGLE_TODO';
const TOGGLE_ALL_ACTION = 'TOGGLE_ALL';
const FILTER_TODOS_ACTION = 'FILTER_TODOS';

const activeTodosPredicate = todo => !todo.completed;
const completedTodosPredicate = todo => todo.completed;

exports.FILTER_ALL = FILTER_ALL;
exports.FILTER_COMPLETED = FILTER_COMPLETED;
exports.FILTER_NOT_COMPLETED = FILTER_NOT_COMPLETED;

exports.ADD_TODO_ACTION = ADD_TODO_ACTION;
exports.REMOVE_TODO_ACTION = REMOVE_TODO_ACTION;
exports.REMOVE_COMPLETED_TODOS_ACTION = REMOVE_COMPLETED_TODOS_ACTION;
exports.TOGGLE_TODO_ACTION = TOGGLE_TODO_ACTION;
exports.TOGGLE_ALL_ACTION = TOGGLE_ALL_ACTION;
exports.FILTER_TODOS_ACTION = FILTER_TODOS_ACTION;

exports.reducer = (state = {}, action) => {
    let todos;
    let filter;

    switch (action.type) {
        case ADD_TODO_ACTION:
            todos = [...(state.todos || []), {
                id: nextId++,
                completed: false,
                text: action.payload
            }];
            filter = state.filter || FILTER_ALL;

            return createState(todos, filter);
        case REMOVE_TODO_ACTION:
            todos = (state.todos || []).filter(todo => todo.id !== action.payload);
            filter = state.filter;

            return createState(todos, filter);
        case REMOVE_COMPLETED_TODOS_ACTION:
            todos = (state.todos || []).filter(todo => todo.completed === false);
            filter = state.filter;

            return createState(todos, filter);
        case TOGGLE_TODO_ACTION:
            todos = (state.todos || []).map(todo => todo.id === action.payload ?
                {...todo, completed: !todo.completed} : todo);
            filter = state.filter;

            return createState(todos, filter);
        case TOGGLE_ALL_ACTION:
            const newState = state.todos.some(activeTodosPredicate);

            todos = (state.todos || []).map(todo => ({...todo, completed: newState}));
            filter = state.filter;

            return createState(todos, filter);
        case FILTER_TODOS_ACTION:
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
            return completedTodosPredicate;
        case FILTER_NOT_COMPLETED:
            return activeTodosPredicate;
        default:
            throw new Error(`Filter not supported: '${filterId}'`);
    }
}

