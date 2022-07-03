import { ChangeEventHandler, RefObject, useRef } from 'react';
import { 
  Box, 
  HStack, 
  VStack, 
  Button,
  FormErrorMessage
} from '@chakra-ui/react';

type FileInputProps = {
  name: string;
  title: string;
  error: string;
  handleFileChange: ChangeEventHandler<HTMLInputElement>;
};

const FileInput = ({ name, title, error, handleFileChange }: FileInputProps) => {
  const hiddenFileInput: (RefObject<HTMLInputElement> | null) = useRef(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    hiddenFileInput.current?.click();
  }

  return (
    <HStack align={"stretch"}>
      <VStack>        
        <input 
          style={{ display:'none' }} 
          ref={hiddenFileInput}
          name={name} 
          type="file"
          onChange={handleFileChange}
        />
        <Button mt="1rem" colorScheme="green" onClick={handleClick}>
          {title}
        </Button>
      </VStack>
      {hiddenFileInput.current && hiddenFileInput.current.files && 
        hiddenFileInput.current.files[0] && (
          <Box p={4} h="full" rounded={"lg"} color="white" bgColor="gray.500">
            Archivo {hiddenFileInput.current.files[0].name}
          </Box>
        )
      }
      {error !== "" && (
        <FormErrorMessage>{error}</FormErrorMessage>
      )}
    </HStack>
  );
}

export default FileInput;
