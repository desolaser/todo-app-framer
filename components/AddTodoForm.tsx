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

interface AddTodoFormProps {
  columnId: string
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ columnId }) => {
  const { addTodoForm } = useTodo(columnId);
  const [ addMode, setAddMode ] = useState<boolean>(false);
  const formColorBox = useColorModeValue('gray.100', 'gray.700');

  if (addMode) {
    return (
      <Box bg={formColorBox} borderRadius=".5rem" w="full">
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
      <HStack bg={formColorBox} spacing={4} p={2} borderRadius=".5rem" justify="space-between" w="full">
        <Box>
          Añada una tarea
        </Box>
        <IconButton aria-label='Add card button' icon={<PlusSquareIcon />} onClick={() => setAddMode(!addMode)} />
      </HStack>
    )
  }
}

export default AddTodoForm;