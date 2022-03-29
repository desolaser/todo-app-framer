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
import { Droppable } from 'react-beautiful-dnd';
import Todo from '../model/Todo';
import Column from '../model/Column';
import TodoDisplay from './TodoDisplay';
import AddTodoForm from './AddTodoForm';
import useColumn from '../hooks/useColumn';

interface ColumnProps {
  column: Column,
  todos: Todo[]
};

const ColumnDisplay: React.FC<ColumnProps> = ({ column, todos }) => {
  const { handleRemove } = useColumn();
  const boxColor = useColorModeValue('gray.200', 'gray.700');
  const boxDragginOverColor = useColorModeValue('blue.300', 'blue.200');
  const textColor = useColorModeValue('black', 'white');
  const textDraggingOverColor = useColorModeValue('white', 'black');

  return (
    <Droppable droppableId={column.id}>
      {(provided, snapshot) => (
        <Box 
          p="1rem" rounded="lg" minWidth="xs"
          bgColor={snapshot.isDraggingOver ? boxDragginOverColor : boxColor}
        >
          <HStack justify="space-between" mb="1rem">
            <Text
              color={snapshot.isDraggingOver ? textDraggingOverColor : textColor}
              style={{ textOverflow: "ellipsis" }} isTruncated maxWidth="xs"
            >
              {column.title}
            </Text>
            <IconButton
              size='md'
              onClick={_ => handleRemove(column.id)}
              aria-label='Delete button'
              icon={<DeleteIcon/>}
            />
          </HStack>
          <VStack 
            {...provided.droppableProps}
            ref={provided.innerRef}
            spacing={4}
          >
            {todos.map((todo, index) => <TodoDisplay key={todo.id} index={index} todo={todo} columnId={column.id} /> )}
            {provided.placeholder}
            <AddTodoForm columnId={column.id} />
          </VStack>
        </Box>
      )}
    </Droppable>
  );
}

export default ColumnDisplay;