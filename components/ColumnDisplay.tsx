import React from 'react';
import { 
  Box, 
  Heading,
  Stack,
  useColorModeValue, 
} from '@chakra-ui/react';
import Todo from '../model/Todo';
import Column from '../model/Column';
import TodoDisplay from '../components/TodoDisplay';

interface ColumnProps {
  column: Column,
  todos: Todo[]
};

const Task: React.FC<ColumnProps> = ({ column, todos }) => {
  const boxColorBox = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box p="1rem" bg={boxColorBox} rounded="xl" w="full">
      <Heading as="h4" size="md" mb="1rem">
        {column.title}
      </Heading>
      <Stack spacing={3}>
        {todos.map(todo => <TodoDisplay key={todo.id} todo={todo} /> )}
      </Stack>
    </Box>
  );
}

export default Task;