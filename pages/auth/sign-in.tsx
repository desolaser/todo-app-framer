import Head from 'next/head';
import { 
  Heading,
  Box, 
  VStack, 
  Button, 
  Center,
  useColorModeValue
} from "@chakra-ui/react";
import InputField from '../../components/inputs/InputField';
import useSignIn from '../../hooks/useSignIn';

const SignIn = () => {
  const { signInForm } = useSignIn();
  const boxValue = useColorModeValue("gray.200", "gray.900");

  return (
    <Box>
      <Head>
        <title>Trollo</title>
        <meta name="description" content="Trollo application, very original app to save your todos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center mt="8rem">
        <form onSubmit={signInForm.handleSubmit}>
          <VStack w="xl" p={4} bgColor={boxValue} rounded={4}>
            <Heading>
              Sign in
            </Heading>
            <InputField
              label="Email"
              name="email"
              type="text"
              value={signInForm.values.email}
              onChange={signInForm.handleChange}
              error={signInForm.errors.email}
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              value={signInForm.values.password}
              onChange={signInForm.handleChange}
              error={signInForm.errors.password}
            />
            <Button type="submit" colorScheme="blue">
              Register
            </Button>
          </VStack>
        </form>
      </Center>
    </Box>
  )
}

export default SignIn;