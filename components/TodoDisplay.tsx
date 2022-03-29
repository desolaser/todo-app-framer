import React, { useState } from 'react';
import { 
  Box, 
  Heading, 
  Text,
  IconButton,
  HStack,
  VStack,
  useColorModeValue, 
} from '@chakra-ui/react';
import { 
  CheckIcon,
  CloseIcon,
  DeleteIcon,
  EditIcon
} from '@chakra-ui/icons';
import Todo from '../model/Todo';
import useTodo from '../hooks/useTodo';
import EditTaskForm from './EditTaskForm';

interface TaskProps {
  todo: Todo,
  columnId: string
};

const Task: React.FC<TaskProps> = ({ todo, columnId }) => {
  const boxColorItem = useColorModeValue('gray.300', 'gray.600');
  const [editMode, setEditMode] = useState<boolean>(false);
  const { handleComplete, handleRemove } = useTodo(columnId);

  const toogleEditMode = () => {
    setEditMode(!editMode);
  }

  return (
    <Box p="1rem" bg={boxColorItem}>
      {!editMode ? (
        <HStack mb="1rem" spacing={8} justify="space-between">
          <VStack spacing={0} align="flex-start">
            <Heading size="lg" mb={1}>{todo.title}</Heading>            
            <Text fontSize='lg'>
              {todo.description}
            </Text>    
          </VStack>
          {todo.isDone && <CheckIcon />}
        </HStack>
      ) : (
        <EditTaskForm todo={todo} setEditMode={setEditMode} />
      )}
      <HStack justify="space-between">
        <IconButton
          size='md'
          onClick={_ => handleComplete(todo.id)}
          colorScheme={todo.isDone ? 'red' : 'green'}
          aria-label='Check button'
          icon={todo.isDone ? <CloseIcon/> : <CheckIcon />}
        />
        <HStack spacing={4}>
          <IconButton       
            size='md'
            onClick={_ => handleRemove(todo.id)}
            colorScheme='red'
            aria-label='Delete button'
            icon={<DeleteIcon/>}
          />
          <IconButton       
            size='md'
            mt={2} 
            onClick={_ => toogleEditMode()}
            colorScheme='blue'
            aria-label='Edit button'
            icon={<EditIcon/>}
          />
        </HStack>    
      </HStack>   
    </Box>
  );
}

export default Task;