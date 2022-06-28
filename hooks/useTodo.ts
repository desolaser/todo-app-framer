
import { useFormik } from 'formik';
import Todo from '../model/Todo';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { add, edit, done, remove } from '../redux/slices/todoSlice';
import { makeId } from '../lib/stringUtils';

const useTodo = (columnId: string) => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todo.todos);
  const addTodoForm = useFormik({
    initialValues: {
      title: ''
    },
    validate: values => { 
      let errors = {};
      if (!values.title)
        errors = { title: "El titulo es obligatorio" };
      return errors;
    },
    onSubmit: values => {
      const todo: Todo = {
        id: generateUniqueId(),
        title: values.title,
        description: '',
        isDone: false,
        date: new Date()
      };
  
      dispatch(add({
        todo,
        columnId
      }));
    },
  });
 
  const handleComplete = (todoId: string): void => {
    dispatch(done(todoId));
  }

  const handleRemove = (todoId: string): void => {
    dispatch(remove({
      todoId,
      columnId
    }));
  }

  const handleEdit = (id: string, title: string, description: string) => {    
    dispatch(edit({ id, title, description }));
  }

  const generateUniqueId = (): string => {
    let todoId: string = "";
    let repeatedTodo: Todo[] = [];
    do {
      todoId = makeId(8);
      repeatedTodo = todos.filter(item => item.id === todoId);
    } while ( repeatedTodo.length > 0 )
    return `todo-${todoId}`;
  }

  return {
    todos,
    addTodoForm,
    handleComplete,
    handleRemove,
    handleEdit
  };
}

export default useTodo;