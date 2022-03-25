import type { FunctionComponent } from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  Button, 
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

interface TaskProps {
  todo: Todo,
  handleComplete: (taskId: string) => void,
  handleRemove: (taskId: string) => void
};

const Task: FunctionComponent<TaskProps> = ({ todo, handleComplete, handleRemove }) => {
  const boxColorItem = useColorModeValue('gray.300', 'gray.600');
  return (
    <Box p="1rem" bg={boxColorItem} rounded="xl">
      <HStack mb="1rem" spacing={8} justify="space-between">
        <VStack spacing={0} align="flex-start">
          <Heading size="lg" mb={1}>{todo.title}</Heading>            
          <Text fontSize='lg'>
            {todo.description}
          </Text>
        </VStack>
        {todo.isDone && <CheckIcon />}
      </HStack>   
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
            onClick={_ => {}}
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