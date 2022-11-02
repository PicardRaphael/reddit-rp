import { Input, Stack, Textarea } from '@chakra-ui/react';
import { FieldErrorsImpl, UseFormRegisterReturn } from 'react-hook-form';

type TextInputsProps = {
  titleRegister: UseFormRegisterReturn;
  bodyRegister: UseFormRegisterReturn;
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: any;
    }>
  >;
};

const TextInputs = ({ titleRegister, bodyRegister }: TextInputsProps) => {
  return (
    <Stack spacing={3} width='100%'>
      <Input
        type='text'
        id='name'
        _placeholder={{ color: 'gray.500' }}
        _focus={{
          outline: 'none',
          bg: 'white',
          border: '1px solid',
          borderColor: 'black',
        }}
        _focusVisible={{
          outline: 'none',
          bg: 'white',
          border: '1px solid',
          borderColor: 'black',
        }}
        fontSize='10pt'
        borderRadius={4}
        placeholder='Titre'
        {...titleRegister}
      />
      <Textarea
        id='body'
        fontSize='10pt'
        placeholder='Texte (falcultatif)'
        _placeholder={{ color: 'gray.500' }}
        _focus={{
          outline: 'none',
          bg: 'white',
          border: '1px solid',
          borderColor: 'black',
        }}
        _focusVisible={{
          outline: 'none',
          bg: 'white',
          border: '1px solid',
          borderColor: 'black',
        }}
        height='100px'
        {...bodyRegister}
      />
    </Stack>
  );
};
export default TextInputs;
