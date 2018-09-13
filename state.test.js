const state = require('./state');
const {
    reducer, ALL_FILTER, COMPLETED_FILTER, NOT_COMPLETED_FILTER,
    ADD_TODO_ACTION, REMOVE_TODO_ACTION, REMOVE_COMPLETED_TODOS_ACTION,
    TOGGLE_TODO_ACTION, TOGGLE_ALL_ACTION, FILTER_TODOS_ACTION
} = state;

describe('state reducer', () => {
    it('should add a new todo when the action is ADD_TODO_ACTION and there are no Todos', () => {
        const newState = reducer({}, {type: ADD_TODO_ACTION, payload: 'Learn Redux'});

        expect(newState).toEqual({
            todos: [{
                id: expect.any(Number),
                completed: false,
                text: 'Learn Redux'
            }],
            filter: ALL_FILTER,
            filteredTodos: [{
                id: expect.any(Number),
                completed: false,
                text: 'Learn Redux'
            }]
        });
    });

    it('should add a new todo when the action is ADD_TODO_ACTION and there are Todos', () => {
        const newState = reducer({todos: [{id: 42, completed: false, text: 'foo'}]}, {
            type: ADD_TODO_ACTION,
            payload: 'Learn Redux'
        });

        expect(newState).toEqual({
            todos: [
                {id: 42, completed: false, text: 'foo'},
                {id: expect.any(Number), completed: false, text: 'Learn Redux'}
            ],
            filter: ALL_FILTER,
            filteredTodos: [
                {id: 42, completed: false, text: 'foo'},
                {id: expect.any(Number), completed: false, text: 'Learn Redux'}
            ]
        });
    });

    it('should remove given todo when the action is REMOVE_TODO_ACTION and the todo exists', () => {
        const newState = reducer({
            todos: [
                {id: 42, completed: false, text: 'Learn Redux'}
            ],
            filter: ALL_FILTER,
            filteredTodos: [
                {id: 42, completed: false, text: 'Learn Redux'}
            ]
        }, {
            type: REMOVE_TODO_ACTION,
            payload: 42
        });

        expect(newState).toEqual({
            todos: [],
            filter: ALL_FILTER,
            filteredTodos: []
        });
    });

    it('should remove given todo when the action is REMOVE_TODO_ACTION and there are Todos', () => {
        const newState = reducer({
            todos: [
                {id: 45, completed: false, text: 'foo'},
                {id: 46, completed: true, text: 'bar'}
            ],
            filter: ALL_FILTER,
            filteredTodos: [
                {id: 45, completed: false, text: 'foo'},
                {id: 46, completed: true, text: 'bar'}
            ]
        }, {
            type: REMOVE_TODO_ACTION,
            payload: 46
        });

        expect(newState).toEqual({
            todos: [
                {id: 45, completed: false, text: 'foo'}
            ],
            filter: ALL_FILTER,
            filteredTodos: [
                {id: 45, completed: false, text: 'foo'}
            ]
        });
    });

    it('should remove all completed todos when the action is REMOVE_COMPLETED_TODOS_ACTION', () => {
        const newState = reducer({
            todos: [
                {id: 45, completed: true, text: 'foo'},
                {id: 46, completed: false, text: 'bar'},
                {id: 47, completed: true, text: 'baz'}
            ],
            filter: ALL_FILTER,
            filteredTodos: [
                {id: 45, completed: true, text: 'foo'},
                {id: 46, completed: false, text: 'bar'},
                {id: 47, completed: true, text: 'baz'}
            ]
        }, {
            type: REMOVE_COMPLETED_TODOS_ACTION
        });

        expect(newState).toEqual({
            todos: [
                {id: 46, completed: false, text: 'bar'},
            ],
            filter: ALL_FILTER,
            filteredTodos: [
                {id: 46, completed: false, text: 'bar'},
            ]
        });
    });

    it('should toggle given todo when the action is TOGGLE_TODO_ACTION and the todo exists', () => {
        const newState = reducer({
            todos: [
                {id: 42, completed: false, text: 'foo'}
            ],
            filter: ALL_FILTER,
            filteredTodos: [
                {id: 42, completed: false, text: 'foo'}
            ]
        }, {
            type: TOGGLE_TODO_ACTION,
            payload: 42
        });

        expect(newState).toEqual({
            todos: [
                {id: 42, completed: true, text: 'foo'}
            ],
            filter: ALL_FILTER,
            filteredTodos: [
                {id: 42, completed: true, text: 'foo'}
            ]
        });
    });

    it('should toggle given todo when the action is TOGGLE_TODO_ACTION and there are Todos', () => {
        const newState = reducer({
            todos: [
                {id: 45, completed: false, text: 'foo'},
                {id: 46, completed: false, text: 'bar'}
            ],
            filter: ALL_FILTER,
            filteredTodos: [
                {id: 45, completed: false, text: 'foo'},
                {id: 46, completed: false, text: 'bar'}
            ]
        }, {
            type: TOGGLE_TODO_ACTION,
            payload: 46
        });

        expect(newState).toEqual({
            todos: [
                {id: 45, completed: false, text: 'foo'},
                {id: 46, completed: true, text: 'bar'}
            ],
            filter: ALL_FILTER,
            filteredTodos: [
                {id: 45, completed: false, text: 'foo'},
                {id: 46, completed: true, text: 'bar'}
            ]
        });
    });

    it('should toggle all todos to true when the action is TOGGLE_ALL_ACTION and there are Todos', () => {
        const newState = reducer({
            todos: [
                {id: 45, completed: false, text: 'foo'},
                {id: 46, completed: false, text: 'bar'},
                {id: 47, completed: false, text: 'baz'}
            ],
            filter: ALL_FILTER,
            filteredTodos: [
                {id: 45, completed: false, text: 'foo'},
                {id: 46, completed: false, text: 'bar'},
                {id: 47, completed: false, text: 'baz'}
            ]
        }, {
            type: TOGGLE_ALL_ACTION
        });

        expect(newState).toEqual({
            todos: [
                {id: 45, completed: true, text: 'foo'},
                {id: 46, completed: true, text: 'bar'},
                {id: 47, completed: true, text: 'baz'}
            ],
            filter: ALL_FILTER,
            filteredTodos: [
                {id: 45, completed: true, text: 'foo'},
                {id: 46, completed: true, text: 'bar'},
                {id: 47, completed: true, text: 'baz'}
            ]
        });
    });

    it('should toggle all todos to false when the action is TOGGLE_ALL_ACTION and there are Todos', () => {
        const newState = reducer({
            todos: [
                {id: 45, completed: true, text: 'foo'},
                {id: 46, completed: true, text: 'bar'},
                {id: 47, completed: true, text: 'baz'}
            ],
            filter: ALL_FILTER,
            filteredTodos: [
                {id: 45, completed: true, text: 'foo'},
                {id: 46, completed: true, text: 'bar'},
                {id: 47, completed: true, text: 'baz'}
            ]
        }, {
            type: TOGGLE_ALL_ACTION
        });

        expect(newState).toEqual({
            todos: [
                {id: 45, completed: false, text: 'foo'},
                {id: 46, completed: false, text: 'bar'},
                {id: 47, completed: false, text: 'baz'}
            ],
            filter: ALL_FILTER,
            filteredTodos: [
                {id: 45, completed: false, text: 'foo'},
                {id: 46, completed: false, text: 'bar'},
                {id: 47, completed: false, text: 'baz'}
            ]
        });
    });

    it('should toggle all todos to true when the action is TOGGLE_ALL_ACTION and there are at least one todo true', () => {
        const newState = reducer({
            todos: [
                {id: 45, completed: false, text: 'foo'},
                {id: 46, completed: false, text: 'bar'},
                {id: 47, completed: true, text: 'baz'}
            ],
            filter: ALL_FILTER,
            filteredTodos: [
                {id: 45, completed: false, text: 'foo'},
                {id: 46, completed: false, text: 'bar'},
                {id: 47, completed: true, text: 'baz'}
            ]
        }, {
            type: TOGGLE_ALL_ACTION
        });

        expect(newState).toEqual({
            todos: [
                {id: 45, completed: true, text: 'foo'},
                {id: 46, completed: true, text: 'bar'},
                {id: 47, completed: true, text: 'baz'}
            ],
            filter: ALL_FILTER,
            filteredTodos: [
                {id: 45, completed: true, text: 'foo'},
                {id: 46, completed: true, text: 'bar'},
                {id: 47, completed: true, text: 'baz'}
            ]
        });
    });

    it('should filter all todos when the action is FILTER_TODOS_ACTION and the filter is ALL_FILTER', () => {
        const newState = reducer({
            todos: [
                {id: 45, completed: false, text: 'foo'},
                {id: 46, completed: true, text: 'bar'}
            ]
        }, {
            type: FILTER_TODOS_ACTION,
            payload: ALL_FILTER
        });

        expect(newState).toEqual({
            todos: [
                {id: 45, completed: false, text: 'foo'},
                {id: 46, completed: true, text: 'bar'}
            ],
            filter: ALL_FILTER,
            filteredTodos: [
                {id: 45, completed: false, text: 'foo'},
                {id: 46, completed: true, text: 'bar'}
            ]
        });

    });

    it('should filter only completed todos when the action is FILTER_TODOS_ACTION and the filter is COMPLETED_FILTER', () => {
        const newState = reducer({
            todos: [
                {id: 45, completed: false, text: 'foo'},
                {id: 46, completed: true, text: 'bar'}
            ]
        }, {
            type: FILTER_TODOS_ACTION,
            payload: COMPLETED_FILTER
        });

        expect(newState).toEqual({
            todos: [
                {id: 45, completed: false, text: 'foo'},
                {id: 46, completed: true, text: 'bar'}],
            filter: COMPLETED_FILTER,
            filteredTodos: [
                {id: 46, completed: true, text: 'bar'}
            ]
        });
    });

    it('should filter only active todos when the action is FILTER_TODOS_ACTION and the filter is NOT_COMPLETED_FILTER', () => {
        const newState = reducer({
            todos: [
                {id: 45, completed: false, text: 'foo'},
                {id: 46, completed: true, text: 'bar'}
            ]
        }, {
            type: FILTER_TODOS_ACTION,
            payload: NOT_COMPLETED_FILTER
        });

        expect(newState).toEqual({
            todos: [
                {id: 45, completed: false, text: 'foo'},
                {id: 46, completed: true, text: 'bar'}
            ],
            filter: NOT_COMPLETED_FILTER,
            filteredTodos: [
                {id: 45, completed: false, text: 'foo'}
            ]
        });
    });
});
