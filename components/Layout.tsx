import React from 'react';
import { 
  Container, 
  Heading,
  Flex,
  Spacer,
  Switch,
  useColorMode, 
} from '@chakra-ui/react';

const Layout: React.FC = ({ children }) => {
  const { toggleColorMode } = useColorMode();

  return (
    <Container maxW="container.xl">
      <Flex>
        <Heading p="1rem">Todo-app</Heading>
        <Spacer />
        <Switch p="2rem" id='color-mode' onChange={toggleColorMode} />
      </Flex>
      {children}
    </Container>
  );
}

export default Layout;