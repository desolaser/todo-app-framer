import React from 'react';
import { 
  FormControl, 
  Input,
  FormErrorMessage,
  Textarea, 
  Button,
} from '@chakra-ui/react';
import useTodo from '../hooks/useTodo';

const AddTaskForm: React.FC = () => {
  const { formik } = useTodo();

  return (
    <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
      <FormControl mb="1rem" isInvalid={'title' in formik.errors}>
        <Input 
          placeholder="Insert text"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
        />
        {'title' in formik.errors && 
          <FormErrorMessage>{formik.errors.title}</FormErrorMessage>}            
      </FormControl>
      <FormControl mb="1rem" isInvalid={'description' in formik.errors}>
        <Textarea 
          placeholder="Insert description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
        />
        {'description' in formik.errors && 
          <FormErrorMessage>{formik.errors.description}</FormErrorMessage>}
      </FormControl>
      <Button colorScheme={'blue'} type="submit" w="full" mb="1rem">
        Agregar
      </Button>
    </form>
  );
}

export default AddTaskForm;