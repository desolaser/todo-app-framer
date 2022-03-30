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
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import useColumn from '../hooks/useColumn';

const AddColumnForm: React.FC = () => {
  const { addColumnForm } = useColumn();  
  const [ addMode, setAddMode ] = useState<boolean>(false);
  const formColorBox = useColorModeValue('gray.100', 'gray.700');
  const inputColor = useColorModeValue('gray.100', 'gray.900');

  if (addMode) {
    return (
      <Box bg={formColorBox} p={4} borderRadius=".5rem" minWidth="xs">
        <form onSubmit={addColumnForm.handleSubmit}>
          <FormControl mb="1rem" isInvalid={'title' in addColumnForm.errors}>
            <Textarea 
              bg={inputColor}
              placeholder="Insert text"
              name="title"
              value={addColumnForm.values.title}
              onChange={addColumnForm.handleChange}
            />
            {'title' in addColumnForm.errors && 
              <FormErrorMessage>{addColumnForm.errors.title}</FormErrorMessage>}            
          </FormControl>
          <HStack justify="space-between">
            <Button colorScheme={'blue'} type="submit" w="full">
              Add
            </Button>
            <IconButton aria-label='Close card button' icon={<CloseIcon />} onClick={() => setAddMode(!addMode)} />
          </HStack>
        </form>
      </Box>
    )
  } else {
    return (
      <HStack 
        bg={formColorBox} 
        spacing={4} p={4} borderRadius=".5rem" 
        minWidth="xs" maxWidth="xs"
        justify="space-between"
      >
        <Box>
          Add column
        </Box>
        <IconButton aria-label='Add card button' icon={<AddIcon />} onClick={() => setAddMode(!addMode)} />
      </HStack>
    )
  }
}

export default AddColumnForm;