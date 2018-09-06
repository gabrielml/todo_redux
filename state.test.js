const state = require('./state');
const {reducer, FILTER_ALL, FILTER_COMPLETED, FILTER_NOT_COMPLETED} = state;

describe('state reducer', () => {
    it('should add a new todo when the action is ADD_TODO and there are no Todos', () => {
        const newState = reducer({}, {type: 'ADD_TODO', payload: 'Learn Redux'});

        expect(newState).toEqual({
            todos: [{
                id: expect.any(Number),
                completed: false,
                text: 'Learn Redux'
            }],
            filter: FILTER_ALL,
            filteredTodos: [{
                id: expect.any(Number),
                completed: false,
                text: 'Learn Redux'
            }]
        });
    });

    it('should add a new todo when the action is ADD_TODO and there are Todos', () => {
        const newState = reducer({todos: [{id: 42, completed: false, text: 'foo'}]}, {
            type: 'ADD_TODO',
            payload: 'Learn Redux'
        });

        expect(newState).toEqual({
            todos: [
                {id: 42, completed: false, text: 'foo'},
                {id: expect.any(Number), completed: false, text: 'Learn Redux'}
            ],
            filter: FILTER_ALL,
            filteredTodos: [
                {id: 42, completed: false, text: 'foo'},
                {id: expect.any(Number), completed: false, text: 'Learn Redux'}
            ]
        });
    });

    it('should remove given todo when the action is REMOVE_TODO and the todo exists', () => {
        const newState = reducer({
            todos: [
                {id: 42, completed: false, text: 'Learn Redux'}
            ],
            filter: FILTER_ALL,
            filteredTodos: [
                {id: 42, completed: false, text: 'Learn Redux'}
            ]
        }, {
            type: 'REMOVE_TODO',
            payload: 42
        });

        expect(newState).toEqual({
            todos: [],
            filter: FILTER_ALL,
            filteredTodos: []
        });
    });

    it('should remove given todo when the action is REMOVE_TODO and there are Todos', () => {
        const newState = reducer({
            todos: [
                {id: 45, completed: false, text: 'foo'},
                {id: 46, completed: true, text: 'bar'}
            ],
            filter: FILTER_ALL,
            filteredTodos: [
                {id: 45, completed: false, text: 'foo'},
                {id: 46, completed: true, text: 'bar'}
            ]
        }, {
            type: 'REMOVE_TODO',
            payload: 46
        });

        expect(newState).toEqual({
            todos: [
                {id: 45, completed: false, text: 'foo'}
            ],
            filter: FILTER_ALL,
            filteredTodos: [
                {id: 45, completed: false, text: 'foo'}
            ]
        });
    });

    it('should toggle given todo when the action is TOGGLE_TODO and the todo exists', () => {
        const newState = reducer({
            todos: [
                {id: 42, completed: false, text: 'foo'}
            ],
            filter: FILTER_ALL,
            filteredTodos: [
                {id: 42, completed: false, text: 'foo'}
            ]
        }, {
            type: 'TOGGLE_TODO',
            payload: 42
        });

        expect(newState).toEqual({
            todos: [
                {id: 42, completed: true, text: 'foo'}
            ],
            filter: FILTER_ALL,
            filteredTodos: [
                {id: 42, completed: true, text: 'foo'}
            ]
        });
    });

    it('should toggle given todo when the action is TOGGLE_TODO and there are Todos', () => {
        const newState = reducer({
            todos: [
                {id: 45, completed: false, text: 'foo'},
                {id: 46, completed: false, text: 'bar'}
            ],
            filter: FILTER_ALL,
            filteredTodos: [
                {id: 45, completed: false, text: 'foo'},
                {id: 46, completed: false, text: 'bar'}
            ]
        }, {
            type: 'TOGGLE_TODO',
            payload: 46
        });

        expect(newState).toEqual({
            todos: [
                {id: 45, completed: false, text: 'foo'},
                {id: 46, completed: true, text: 'bar'}
            ],
            filter: FILTER_ALL,
            filteredTodos: [
                {id: 45, completed: false, text: 'foo'},
                {id: 46, completed: true, text: 'bar'}
            ]
        });

    });

    it('should filter all todos when the action is FILTER_TODOS and the filter is FILTER_ALL', () => {
        const newState = reducer({
            todos: [
                {id: 45, completed: false, text: 'foo'},
                {id: 46, completed: true, text: 'bar'}
            ]
        },{
            type: 'FILTER_TODOS',
            payload: FILTER_ALL
        });

        expect(newState).toEqual({
            todos: [
                {id: 45, completed: false, text: 'foo'},
                {id: 46, completed: true, text: 'bar'}
            ],
            filter: FILTER_ALL,
            filteredTodos: [
                {id: 45, completed: false, text: 'foo'},
                {id: 46, completed: true, text: 'bar'}
            ]
        });

    });

    it('should filter only completed todos when the action is FILTER_TODOS and the filter is FILTER_COMPLETED', () => {
        const newState = reducer({
            todos: [
                {id: 45, completed: false, text: 'foo'},
                {id: 46, completed: true, text: 'bar'}
            ]
        }, {
            type: 'FILTER_TODOS',
            payload: FILTER_COMPLETED
        });

        expect(newState).toEqual({
            todos: [
                {id: 45, completed: false, text: 'foo'},
                {id: 46, completed: true, text: 'bar'}],
            filter: FILTER_COMPLETED,
            filteredTodos: [
                {id: 46, completed: true, text: 'bar'}
            ]
        });
    });

    it('should filter only active todos when the action is FILTER_TODOS and the filter is FILTER_NOT_COMPLETED', () => {
        const newState = reducer({
            todos: [
                {id: 45, completed: false, text: 'foo'},
                {id: 46, completed: true, text: 'bar'}
            ]
        }, {
            type: 'FILTER_TODOS',
            payload: FILTER_NOT_COMPLETED
        });

        expect(newState).toEqual({
            todos: [
                {id: 45, completed: false, text: 'foo'},
                {id: 46, completed: true, text: 'bar'}
            ],
            filter: FILTER_NOT_COMPLETED,
            filteredTodos: [
                {id: 45, completed: false, text: 'foo'}
            ]
        });
    });
});
