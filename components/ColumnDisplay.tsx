import React, { useState } from 'react';
import { 
  Box, 
  Text,
  VStack,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue, 
} from '@chakra-ui/react';
import { HamburgerIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Todo from '../model/Todo';
import Column from '../model/Column';
import TodoDisplay from './TodoDisplay';
import AddTodoForm from './AddTodoForm';
import useColumn from '../hooks/useColumn';
import EditColumnForm from './EditColumnForm';

interface ColumnProps {
  index: number,
  column: Column,
  todos: Todo[]
};

const ColumnDisplay: React.FC<ColumnProps> = ({ index, column, todos }) => {
  const { handleRemove } = useColumn();
  const [ editMode, setEditMode ] = useState<boolean>(false);
  const boxColor = useColorModeValue('gray.200', 'gray.700');
  const boxDragginOverColor = useColorModeValue('blue.300', 'blue.200');
  const textColor = useColorModeValue('black', 'white');
  const textDraggingOverColor = useColorModeValue('white', 'black');

  return (
    <Draggable draggableId={column.id} index={index}>
      {providedDraggable => (
        <Box 
          {...providedDraggable.draggableProps}
          ref={providedDraggable.innerRef}
        >
          <Droppable droppableId={column.id} type="todo">
            {(provided, snapshot) => (
              <Box 
                p="1rem" rounded="lg" minWidth="xs"
                bgColor={snapshot.isDraggingOver ? boxDragginOverColor : boxColor}
              >
                <HStack 
                  {...providedDraggable.dragHandleProps}
                  justify="space-between" mb="1rem"
                >
                  {editMode ? (
                    <EditColumnForm column={column} setEditMode={setEditMode} />
                  ) : (
                    <>                     
                      <Text
                        color={snapshot.isDraggingOver ? textDraggingOverColor : textColor}
                        style={{ textOverflow: "ellipsis" }} isTruncated maxWidth="xs"
                      >
                        {column.title}
                      </Text>
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          aria-label='Options'
                          icon={<HamburgerIcon />}
                          variant='outline'
                        />
                        <MenuList>
                          <MenuItem onClick={_ => setEditMode(!editMode)} icon={<EditIcon />}>
                            Edit
                          </MenuItem>
                          <MenuItem onClick={_ => handleRemove(column.id)} icon={<DeleteIcon />}>
                            Delete
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </>                   
                  )}
                  
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
        </Box>
      )}
    </Draggable>
  );
}

export default ColumnDisplay;