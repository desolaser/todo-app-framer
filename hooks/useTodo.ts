
import { useFormik } from 'formik';
import Todo from '../model/Todo';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { add, edit, done, remove } from '../redux/slices/todoSlice';
import { makeId } from '../lib/stringUtils';

const useTodo = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todo.todos);
  const formik = useFormik({
    initialValues: {
      title: '',
      description: ''
    },
    validate: values => { 
      let errors = {};

      if (!values.title)
        errors = { title: "El titulo es obligatorio" };
      if (!values.description)
        errors = { ...errors, description: "La descripción es obligatoria" };

      return errors;
    },
    onSubmit: values => {
      const todo: Todo = {
        id: generateUniqueId(),
        title: values.title,
        description: values.description,
        isDone: false,
        date: new Date()
      }
  
      dispatch(add(todo));
    },
  });
 
  const handleComplete = (taskId: string): void => {
    dispatch(done(taskId));
  }

  const handleRemove = (taskId: string): void => {
    dispatch(remove(taskId));
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
    return todoId;
  }

  return {
    todos,
    formik,
    handleComplete,
    handleRemove,
    handleEdit
  }
}

export default useTodo;