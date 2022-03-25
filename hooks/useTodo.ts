import Todo from '../model/Todo';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { add, edit, done, remove } from '../redux/slices/todoSlice';
import { makeId } from '../lib/stringUtils';
import { useFormik } from 'formik';

type AddFormErrors = {
  title: string,
  description: string
};

const useTodo = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todo);
  const formik = useFormik({
    initialValues: {
      title: '',
      description: ''
    },
    onSubmit: values => {
      console.log(values)

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

  const handleEdit = (taskId: string): void => {
    const editedTodo = todos.filter(todo => todo.id === taskId)[0];
    dispatch(edit({
      id: taskId,
      todo: editedTodo
    }));
  }

  const handleComplete = (taskId: string): void => {
    dispatch(done(taskId));
  }

  const handleRemove = (taskId: string): void => {
    dispatch(remove(taskId));
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