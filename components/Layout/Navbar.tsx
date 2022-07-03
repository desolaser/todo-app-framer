import Link from 'next/link';
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
        <Link href="/auth/sign-up">
          <Button>
            Sign Up
          </Button>
        </Link>
        <Link href="/auth/sign-in">
          <Button>
            Sign In
          </Button>
        </Link>
        <Switch p="2rem" id='color-mode' onChange={toggleColorMode} />
      </HStack>
    </Flex>
  )
}

export default Navbar