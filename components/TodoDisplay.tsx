import React, { useState } from 'react';
import { 
  Box,
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
import { Draggable } from 'react-beautiful-dnd';
import Todo from '../model/Todo';
import useTodo from '../hooks/useTodo';
import EditTaskForm from './EditTaskForm';

interface TaskProps {
  index: number,
  todo: Todo,
  columnId: string
};

const Task: React.FC<TaskProps> = ({ index, todo, columnId }) => {
  const boxColor = useColorModeValue('gray.300', 'gray.600');
  const boxDraggingColor = useColorModeValue('gray.200', 'gray.500');
  const [ editMode, setEditMode ] = useState<boolean>(false);
  const { handleComplete, handleRemove } = useTodo(columnId);

  const toogleEditMode = () => {
    setEditMode(!editMode);
  }

  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided, snapshot) => (
        <Box 
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          bgColor={snapshot.isDragging ? boxDraggingColor : boxColor}
          p="1rem" maxWidth="xs" minWidth="xs"
        >
          {!editMode ? (
            <HStack mb="1rem" spacing={8} justify="space-between">
              <VStack spacing={2} align="flex-start">
                <Text noOfLines={3} style={{ textOverflow: "ellipsis" }} maxWidth="xs">
                  {todo.title}
                </Text>          
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
      )}
    </Draggable>    
  );
}

export default Task;