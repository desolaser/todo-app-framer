import React from 'react';
import {
  FormControl,
  FormErrorMessage,
  Textarea,
  Button,
} from '@chakra-ui/react';
import useColumn from '../hooks/useColumn';

const AddColumnForm: React.FC = () => {
  const { addColumnForm } = useColumn();

  return (
    <form onSubmit={addColumnForm.handleSubmit} style={{ width: '100%' }}>
      <FormControl mb="1rem" isInvalid={'title' in addColumnForm.errors}>
        <Textarea 
          placeholder="Insert text"
          name="title"
          value={addColumnForm.values.title}
          onChange={addColumnForm.handleChange}
        />
        {'title' in addColumnForm.errors && 
          <FormErrorMessage>{addColumnForm.errors.title}</FormErrorMessage>}            
      </FormControl>      
      <Button colorScheme={'blue'} type="submit" w="full" mb="1rem">
        Agregar
      </Button>
    </form>
  );
}

export default AddColumnForm;