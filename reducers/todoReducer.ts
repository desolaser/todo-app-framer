import Todo from '../model/Todo';

type Actions = 
  | { type: 'add', payload: { title: string, description: string } }
  | { type: 'done', payload: number }
  | { type: 'remove', payload: number }
  | { type: 'edit', payload: { id: number, text: string } };

const TodoReducer = (state: Todo[], action: Actions) => {
  switch (action.type) {
    case 'add':
      return [...state, { 
        id: parseInt(Date.now().toString()), 
        title: action.payload.title,  
        description: action.payload.description,
        date: Date.now()      
      }]
    case 'done':
      return []
  }
}

export default TodoReducer;
export type {
  Actions
};