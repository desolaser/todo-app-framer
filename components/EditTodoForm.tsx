import React from 'react';
import { useFormik } from 'formik';
import { 
  FormControl, 
  Input,
  FormErrorMessage,
  Textarea, 
  Button,
} from '@chakra-ui/react';
import useTodo from '../hooks/useTodo';
import Todo from '../model/Todo';

interface EditTodoFormProps {
  todo: Todo,
  setEditMode: (value: boolean) => void
}

const EditTodoForm: React.FC<EditTodoFormProps> = ({ todo, setEditMode }) => {
  const { handleEdit } = useTodo('');
  const editForm = useFormik({
    initialValues: {
      title: todo.title,
      description: todo.description
    },
    validate: values => { 
      let errors = {};

      if (!values.title)
        errors = { title: "El titulo es obligatorio" };

      return errors;
    },
    onSubmit: values => {
      handleEdit(todo.id, values.title, values.description);
      setEditMode(false);
    },
  });

  return (
    <form onSubmit={editForm.handleSubmit} style={{ width: '100%' }}>
      <FormControl mb="1rem" isInvalid={'title' in editForm.errors}>
        <Input 
          placeholder="Change todo title"
          name="title"
          value={editForm.values.title}
          onChange={editForm.handleChange}
        />
        {'title' in editForm.errors && 
          <FormErrorMessage>{editForm.errors.title}</FormErrorMessage>}            
      </FormControl>
      <FormControl mb="1rem" isInvalid={'description' in editForm.errors}>
        <Textarea 
          placeholder="Change todo description"
          name="description"
          value={editForm.values.description}
          onChange={editForm.handleChange}
        />
        {'description' in editForm.errors && 
          <FormErrorMessage>{editForm.errors.description}</FormErrorMessage>}
      </FormControl>
      <Button aria-label="save-todo-change" colorScheme="blue" type="submit" w="full" mb="1rem">
        Save
      </Button>
    </form>
  );
}

export default EditTodoForm;