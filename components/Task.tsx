import type { FunctionComponent } from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  Button, 
  Checkbox,
  HStack,
  VStack,
  useColorModeValue, 
} from '@chakra-ui/react';
import { 
  CheckIcon  
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
      <HStack spacing={8} justify="space-between">
        <VStack spacing={0} align="flex-start">
          <Heading size="lg" mb={1}>{todo.title}</Heading>            
          <Text fontSize='lg'>
            {todo.description}
          </Text>
        </VStack>
        {todo.isDone && <CheckIcon />}
      </HStack>
      <Button size='md' colorScheme='green' mt={2} mr={2} onClick={_ => handleComplete(todo.id)}>
        Complete Task
      </Button>
      <Button size='md' colorScheme='red' mt={2} onClick={_ => handleRemove(todo.id)}>
        Delete
      </Button>
    </Box>
  );
}

export default Task;