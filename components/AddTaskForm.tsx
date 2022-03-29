import React from 'react';
import {
  FormControl,
  FormErrorMessage,
  Textarea,
  Button,
} from '@chakra-ui/react';
import useTodo from '../hooks/useTodo';

interface AddTaskFormProps {
  columnId: string
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ columnId }) => {
  const { addTodoForm } = useTodo(columnId);

  return (
    <form onSubmit={addTodoForm.handleSubmit} style={{ width: '100%' }}>
      <FormControl mb="1rem" isInvalid={'title' in addTodoForm.errors}>
        <Textarea 
          placeholder="Insert text"
          name="title"
          value={addTodoForm.values.title}
          onChange={addTodoForm.handleChange}
        />
        {'title' in addTodoForm.errors && 
          <FormErrorMessage>{addTodoForm.errors.title}</FormErrorMessage>}            
      </FormControl>      
      <Button colorScheme={'blue'} type="submit" w="full" mb="1rem">
        Agregar
      </Button>
    </form>
  );
}

export default AddTaskForm;