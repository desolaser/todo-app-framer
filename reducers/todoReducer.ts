import Todo from '../model/Todo';

type Actions = 
  | { type: 'add', payload: { title: string, description: string } }
  | { type: 'done', payload: number }
  | { type: 'remove', payload: number }
  | { type: 'edit', payload: { id: number, text: string } }
  | { type: 'setTodos', payload: Todo[] };

const TodoReducer = (state: Todo[], action: Actions) => {
  switch (action.type) {
    case 'add':
      return [...state, { 
        id: parseInt(Date.now().toString()), 
        title: action.payload.title,  
        description: action.payload.description,
        date: Date.now()      
      }];
    case 'done':
      return state.map(todo => todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo);
    case 'edit':
      return state.map(todo => todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo);
    case 'remove':
      return state.filter(todo => todo.id !== action.payload);
    case 'setTodos':
      return action.payload;
  }
}

export default TodoReducer;
export type {
  Actions
};