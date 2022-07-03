import { useFormik } from 'formik';
import { useToast } from '@chakra-ui/react';

type SingInErrors = {
  email?: string;
  password?: string;
}

const useSignIn = () => {
  const toast = useToast();
  const signInForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      let errors: SingInErrors = {};
      if (values.email == "") {
        errors.email = "Email field is required";
      }
      if (values.password == "") {
        errors.password = "Password field is required";
      }

      return errors;
    },
    onSubmit: (values) => {
      toast({
        title: 'Successful sign in.',
        description: "You are logged in.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    }
  });

  return {
    signInForm
  }
}

export default useSignIn;