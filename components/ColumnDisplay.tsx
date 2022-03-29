import React from 'react';
import { 
  Box, 
  Text,
  VStack,
  HStack,
  IconButton,
  useColorModeValue, 
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import Todo from '../model/Todo';
import Column from '../model/Column';
import TodoDisplay from './TodoDisplay';
import AddTodoForm from './AddTodoForm';
import useColumn from '../hooks/useColumn';
interface ColumnProps {
  column: Column,
  todos: Todo[]
};

const Task: React.FC<ColumnProps> = ({ column, todos }) => {
  const { handleRemove } = useColumn();
  const boxColorBox = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box p="1rem" bg={boxColorBox} rounded="lg" minWidth="xs">
      <HStack justify="space-between" mb="1rem">
        <Text noOfLines={3} style={{ textOverflow: "ellipsis" }} maxWidth="xs">
          {column.title}
        </Text>
        <IconButton       
          size='md'
          onClick={_ => handleRemove(column.id)}
          aria-label='Delete button'
          icon={<DeleteIcon/>}
        />
      </HStack>
      <VStack spacing={4}>
        {todos.map(todo => <TodoDisplay key={todo.id} todo={todo} columnId={column.id} /> )}
        <AddTodoForm columnId={column.id} />
      </VStack>
    </Box>
  );
}

export default Task;