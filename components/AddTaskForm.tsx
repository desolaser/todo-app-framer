import React, { useState } from 'react';
import {
  FormControl,
  FormErrorMessage,
  Textarea,
  Button,
  HStack,
  Box,
  IconButton,
  useColorModeValue
} from '@chakra-ui/react';
import { PlusSquareIcon, CloseIcon } from '@chakra-ui/icons';
import useTodo from '../hooks/useTodo';

interface AddTaskFormProps {
  columnId: string
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ columnId }) => {
  const { addTodoForm } = useTodo(columnId);
  const [ addMode, setAddMode ] = useState<boolean>(false);
  const formColorBox = useColorModeValue('gray.100', 'gray.700');

  if (addMode) {
    return (
      <Box bg={formColorBox} p={4} borderRadius=".5rem">
        <form onSubmit={addTodoForm.handleSubmit}>
          <FormControl mb="1rem" isInvalid={'title' in addTodoForm.errors}>
            <Textarea 
              bg={useColorModeValue('gray.100', 'gray.900')}
              placeholder="Insert text"
              name="title"
              value={addTodoForm.values.title}
              onChange={addTodoForm.handleChange}
            />
            {'title' in addTodoForm.errors && 
              <FormErrorMessage>{addTodoForm.errors.title}</FormErrorMessage>}            
          </FormControl>
          <HStack>
            <Button colorScheme={'blue'} type="submit" w="full">
              Agregar
            </Button>
            <IconButton aria-label='Close card button' icon={<CloseIcon />} onClick={() => setAddMode(!addMode)} />
          </HStack>
        </form>
      </Box>
    )
  } else {
    return (
      <HStack bg={formColorBox} spacing={4} p={4} borderRadius=".5rem">
        <Box>
          Añada una columna
        </Box>
        <IconButton aria-label='Add card button' icon={<PlusSquareIcon />} onClick={() => setAddMode(!addMode)} />
      </HStack>
    )
  }
}

export default AddTaskForm;