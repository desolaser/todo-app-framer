
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addColumn, editColumn, removeColumn } from '../redux/slices/todoSlice';
import { makeId } from '../lib/stringUtils';
import Column from '../model/Column';
import Todo from '../model/Todo';

const useColumn = () => {
  const dispatch = useAppDispatch();
  const { todos, columns, columnOrder } = useAppSelector(state => state.todo);

  const addColumnForm = useFormik({
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
      const column: Column = {
        id: generateUniqueId(),
        title: values.title,
        todoIds: []
      }
  
      dispatch(addColumn(column));
    },
  });

  const handleRemove = (columnId: string): void => {
    dispatch(removeColumn(columnId));
  }

  const handleEdit = (columnId: string, title: string) => {    
    dispatch(editColumn({ columnId, title }));
  }

  const getOrderedColumns = () => {
    return columnOrder.map((columnId: string) => {
      const column: Column = columns.filter(column => column.id == columnId)[0];
      const todosList: Todo[] = column.todoIds.map(todoId => todos.filter(todo => todo.id = todoId)[0] )

      return {
        column,
        todosList
      };
    })
  }

  const generateUniqueId = (): string => {
    let todoId: string = "";
    let repeatedColumn: Column[] = [];
    do {
      todoId = makeId(8);
      repeatedColumn = columns.filter(item => item.id === todoId);
    } while ( repeatedColumn.length > 0 )
    return todoId;
  }

  return {
    columns,
    addColumnForm,
    handleRemove,
    handleEdit,
    getOrderedColumns
  }
}

export default useColumn;