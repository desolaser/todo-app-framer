import { FunctionComponent } from "react"
import { 
  Box, 
  Heading, 
  Text, 
  Button, 
  useColorModeValue, 
} from '@chakra-ui/react'

interface TaskProps {
  id: string,
  title: string,
  description: string,
  handleComplete: any,
  handleDelete: any
}

const Task: FunctionComponent<TaskProps> = ({ id, title, description, handleComplete, handleDelete }) => {
  const boxColorItem = useColorModeValue('gray.300', 'gray.600')
  return (
    <Box p="1rem" bg={boxColorItem} rounded="xl">
      <Heading size="lg" mb={1}>{title}</Heading>            
      <Text fontSize='lg'>
        {description}
      </Text>
      <Button size='md' colorScheme='green' mt={2} mr={2} onClick={handleComplete}>
        Complete Task
      </Button>
      <Button size='md' colorScheme='red' mt={2} onClick={handleDelete}>
        Borrar
      </Button>
    </Box>
  )
}

export default Task
