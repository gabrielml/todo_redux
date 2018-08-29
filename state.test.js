const reducer = require('./state');

describe('state reducer', () => {
    it('should add a new todo when the action is ADD_TODO and there are no Todos', () => {
        const newState = reducer({}, {type: 'ADD_TODO', payload: 'Learn Redux'});

        expect(newState).toEqual({
            todos: [{
                id: expect.any(Number),
                completed: false,
                text: 'Learn Redux'
            }],
            filter: 'ALL',
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
            filter: 'ALL',
            filteredTodos: [
                {id: 42, completed: false, text: 'foo'},
                {id: expect.any(Number), completed: false, text: 'Learn Redux'}
            ]
        });
    });

    it('should remove given todo when the action is REMOVE_TODO and the todo exists', () => {
        const newState = reducer({todos: [{id: 42, completed: false, text: 'Learn Redux'}]}, {
            type: 'REMOVE_TODO',
            payload: 42
        });

        expect(newState).toEqual({todos: []});
    });

    it('should toggle given todo when the action is TOGGLE_TODO and the todo exists', () => {
        const newState = reducer({todos: [{id: 42, completed: false, text: 'foo'}]}, {
            type: 'TOGGLE_TODO',
            payload: 42
        });

        expect(newState).toEqual({
            todos: [
                {id: 42, completed: true, text: 'foo'}
            ]
        });
    });

    it('should filter only completed todos when the action is FILTER_TODOS and the filter is COMPLETED', () => {
        const newState = reducer({
            todos: [
                {id: 45, completed: false, text: 'foo'},
                {id: 46, completed: true, text: 'bar'}
            ]
        }, {
            type: 'FILTER_TODOS',
            payload: 'COMPLETED'
        });

        expect(newState).toEqual({
            todos: [
                {id: 45, completed: false, text: 'foo'},
                {id: 46, completed: true, text: 'bar'}],
            filter: 'COMPLETED',
            filteredTodos: [
                {id: 46, completed: true, text: 'bar'}
            ]
        });
    });
});
