import type { FunctionComponent } from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  Button, 
  useColorModeValue, 
} from '@chakra-ui/react';
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
      <Heading size="lg" mb={1}>{todo.title}</Heading>            
      <Text fontSize='lg'>
        {todo.description}
      </Text>
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