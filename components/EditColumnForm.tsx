import React from 'react';
import { useFormik } from 'formik';
import { 
  FormControl, 
  Input,
  FormErrorMessage,
  HStack,
  Icon,
  Button,
  useColorModeValue
} from '@chakra-ui/react';
import useColumn from '../hooks/useColumn';
import Column from '../model/Column';
import { AiFillSave } from 'react-icons/ai';

interface EditColumnFormProps {
  column: Column,
  setEditMode: (value: boolean) => void
}

const EditColumnForm: React.FC<EditColumnFormProps> = ({ column, setEditMode }) => {
  const { handleEdit } = useColumn();
  const formColorBox = useColorModeValue('gray.100', 'gray.800');
  const editForm = useFormik({
    initialValues: {
      title: column.title
    },
    validate: values => { 
      let errors = {};

      if (!values.title)
        errors = { title: "El titulo es obligatorio" };

      return errors;
    },
    onSubmit: values => {
      handleEdit(column.id, values.title);
      setEditMode(false);
    },
  });

  return (
    <form onSubmit={editForm.handleSubmit} style={{ width: '100%' }}>
      <HStack spacing={4}>
        <FormControl isInvalid={'title' in editForm.errors}>
          <Input 
            placeholder="Change column title"
            name="title"
            bgColor={formColorBox}
            value={editForm.values.title}
            onChange={editForm.handleChange}
          />
          {'title' in editForm.errors && 
            <FormErrorMessage>{editForm.errors.title}</FormErrorMessage>}
        </FormControl>
        <Button aria-label="save-column" type="submit">
          <Icon as={AiFillSave} />
        </Button>
      </HStack>
    </form>
  );
}

export default EditColumnForm;