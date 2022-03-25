import Todo from '../model/Todo';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { add, edit, done, remove } from '../redux/slices/todoSlice';
import { makeId } from '../lib/stringUtils';

const useTodo = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todo);

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

  const handleAdd = (): void => {
    const todo: Todo = {
      id: generateUniqueId(),
      title: "",
      description: "",
      isDone: false,
      date: new Date()
    }

    dispatch(add(todo));
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
    handleAdd,
    handleComplete,
    handleRemove,
    handleEdit
  }
}

export default useTodo;