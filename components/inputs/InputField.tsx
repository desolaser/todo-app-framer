import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  FormHelperText,
  FormErrorMessage,
} from '@chakra-ui/react';

type InputFieldProps = {  
  label: string;
  name: string;
  type: string;
  value: number | string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
  error: string | undefined;
  helpText?: string;
  disabled?: boolean;
  children?: JSX.Element;
  isRequired?: boolean;
} 

const InputField = ({ 
  label,
  name, 
  type, 
  value, 
  onChange, 
  error, 
  helpText,
  disabled, 
  children,
  isRequired
}: InputFieldProps) => (
  <FormControl isRequired={typeof isRequired != "undefined"} isInvalid={typeof error == "string"}>
    <FormLabel htmlFor={name}>{label}</FormLabel>
    {type == 'select' ? (
      <Select
        name={name}
        aria-label={name}
        value={value}
        onChange={onChange}
        disabled={disabled}>
        {children}
      </Select>
    ) : type == 'textarea' ? (
      <Textarea
        name={name}
        aria-label={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    ) : (
      <Input
        name={name}
        aria-label={name}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    )}
    {typeof error !== "string" ? (
      helpText && <FormHelperText>{helpText}</FormHelperText>
    ) : (
      <FormErrorMessage>{error}</FormErrorMessage>
    )}
  </FormControl>
)

export default InputField;