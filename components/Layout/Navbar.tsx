import {
  Flex,
  HStack,
  Button,
  Heading,
  Switch,
  Spacer,
  useColorMode
} from '@chakra-ui/react';
import React from 'react';

const Navbar = () => {
  const { toggleColorMode } = useColorMode();

  return (
    <Flex w="full">
      <Heading p="1rem">
        Trollo
      </Heading>
      <Spacer />
      <HStack spacing={4}>
        <Button>
          Sign Up
        </Button>
        <Button>
          Login
        </Button>
        <Switch p="2rem" id='color-mode' onChange={toggleColorMode} />
      </HStack>
    </Flex>
  )
}

export default Navbar