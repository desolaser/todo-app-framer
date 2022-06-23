import React from 'react';
import { 
  Container,
  Flex,
} from '@chakra-ui/react';
import Navbar from './Navbar';

const Layout: React.FC = ({ children }) => {

  return (
    <Container maxW="container.xl">
      <Flex>
        <Navbar />
      </Flex>
      {children}
    </Container>
  );
}

export default Layout;