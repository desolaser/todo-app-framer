import { FunctionComponent, useState } from 'react';
import { useFormik } from 'formik';
import { 
  Box, 
  Heading, 
  Text, 
  Button, 
  IconButton,
  HStack,
  VStack,
  Input,
  Textarea,
  FormControl,
  FormErrorMessage,
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

interface TaskProps {
  todo: Todo,
  handleComplete: (taskId: string) => void,
  handleRemove: (taskId: string) => void
};

const Task: FunctionComponent<TaskProps> = ({ todo, handleComplete, handleRemove }) => {
  const boxColorItem = useColorModeValue('gray.300', 'gray.600');
  const [editMode, setEditMode] = useState<boolean>(false);
  const { handleEdit } = useTodo();
  const editForm = useFormik({
    initialValues: {
      title: todo.title,
      description: todo.description
    },
    validate: values => { 
      let errors = {};

      if (!values.title)
        errors = { title: "El titulo es obligatorio" };
      if (!values.description)
        errors = { ...errors, description: "La descripción es obligatoria" };

      return errors;
    },
    onSubmit: values => {
      handleEdit(todo.id, values.title, values.description);
      setEditMode(false);
    },
  });

  const toogleEditMode = () => {
    setEditMode(!editMode);
  }

  return (
    <Box p="1rem" bg={boxColorItem} rounded="xl">
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
        <form onSubmit={editForm.handleSubmit} style={{ width: '100%' }}>
          <Input type="hidden" name="id" value={todo.id} />
          <FormControl mb="1rem" isInvalid={'title' in editForm.errors}>
            <Input 
              placeholder="Insert text"
              name="title"
              value={editForm.values.title}
              onChange={editForm.handleChange}
            />
            {'title' in editForm.errors && 
              <FormErrorMessage>{editForm.errors.title}</FormErrorMessage>}            
          </FormControl>
          <FormControl mb="1rem" isInvalid={'description' in editForm.errors}>
            <Textarea 
              placeholder="Insert description"
              name="description"
              value={editForm.values.description}
              onChange={editForm.handleChange}
            />
            {'description' in editForm.errors && 
              <FormErrorMessage>{editForm.errors.description}</FormErrorMessage>}
          </FormControl>
          <Button colorScheme="blue" type="submit" w="full" mb="1rem">
            Guardar
          </Button>
        </form>
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