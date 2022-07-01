import Head from 'next/head';
import { 
  Box, 
  VStack, 
  Button, 
  Center,
  useColorModeValue
} from "@chakra-ui/react";
import InputField from '../../components/inputs/InputField';
import useSignUp from '../../hooks/useSignUp';

const SignUp = () => {
  const { signUpForm } = useSignUp();
  const boxValue = useColorModeValue("gray.200", "gray.900");

  return (
    <Box>
      <Head>
        <title>Trollo</title>
        <meta name="description" content="Trollo application, very original app to save your todos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center mt="8rem">
        <form onSubmit={signUpForm.handleSubmit}>
          <VStack w="xl" p={4} bgColor={boxValue} rounded={4}>
            <InputField
              label="Email"
              name="email"
              type="text"
              value={signUpForm.values.email}
              onChange={signUpForm.handleChange}
              error={signUpForm.errors.email}
            />
            <InputField
              label="Email Confirmation"
              name="emailConfirmation"
              type="text"
              value={signUpForm.values.emailConfirmation}
              onChange={signUpForm.handleChange}
              error={signUpForm.errors.emailConfirmation}
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              value={signUpForm.values.password}
              onChange={signUpForm.handleChange}
              error={signUpForm.errors.password}
            />
            <InputField
              label="Password Confirmation"
              name="passwordConfirmation"
              type="password"
              value={signUpForm.values.passwordConfirmation}
              onChange={signUpForm.handleChange}
              error={signUpForm.errors.passwordConfirmation}
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

export default SignUp;