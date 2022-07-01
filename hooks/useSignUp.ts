import { useFormik } from 'formik';
import { useToast } from '@chakra-ui/react';

type SingUpErrors = {
  email?: string;
  emailConfirmation?: string;
  password?: string;
  passwordConfirmation?: string;
}

const useSignUp = () => {
  const toast = useToast();
  const signUpForm = useFormik({
    initialValues: {
      email: "",
      emailConfirmation: "",
      password: "",
      passwordConfirmation: ""
    },
    validate: (values) => {
      let errors: SingUpErrors = {};
      if (values.email == "") {
        errors.email = "Email field is required";
      }
      if (values.emailConfirmation == "") {
        errors.emailConfirmation = "Email confirmation field is required";
      }
      if (values.password == "") {
        errors.password = "Password field is required";
      }
      if (values.passwordConfirmation == "") {
        errors.passwordConfirmation = "Password confirmation field is required";
      }
      
      if (values.email != values.emailConfirmation) {
        errors.emailConfirmation = "Email confirmation and Email fields are different";
      }
      if (values.password != values.passwordConfirmation) {
        errors.passwordConfirmation = "Password confirmation and password fields are different";
      }

      return errors;
    },
    onSubmit: (values) => {
      toast({
        title: 'Successful sign up.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    }
  });

  return {
    signUpForm
  }
}

export default useSignUp;