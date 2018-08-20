const reducer = require('./state');

describe('state reducer', () => {
    it('should add a new todo when the action is ADD_TODO and there are no Todos', () => {
        const newState = reducer({}, {type: 'ADD_TODO', payload: 'Learn Redux'});

        expect(newState).toEqual({todos: [{id: expect.any(Number), text: 'Learn Redux'}]});
    });

    it('should add a new todo when the action is ADD_TODO and there are Todos', () => {
        const newState = reducer({todos: [{id: 42, text: 'foo'}]}, {type: 'ADD_TODO', payload: 'Learn Redux'});

        expect(newState).toEqual({
            todos: [
                {id: 42, text: 'foo'},
                {id: expect.any(Number), text: 'Learn Redux'}
            ]
        });
    });

    it('should remove given todo when the action is REMOVE_TODO and the todo exists', () => {
        const newState = reducer({todos: [{id: 42, text: 'Learn Redux'}]}, {type: 'REMOVE_TODO', payload: 42});

        expect(newState).toEqual({todos: []});
    });
});
