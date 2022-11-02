import { WarningIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { auth } from '../../../firebase/clientApp';
import { FIREBASE_ERRORS } from '../../../firebase/errors';
import { FormLoginValues, ModalView } from '../../../types/auth.types';
import { loginSchema } from '../../../utils/authSchema';

type LoginProps = { toggleView: (view: ModalView) => void };

const Login = ({ toggleView }: LoginProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormLoginValues>({
    resolver: yupResolver(loginSchema),
  });

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const onSubmit: SubmitHandler<FormLoginValues> = (values) => {
    signInWithEmailAndPassword(values.email, values.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
      <FormControl isInvalid={Boolean(errors.email)} mb={2}>
        <InputGroup>
          {errors.email && (
            <InputRightElement
              pointerEvents='none'
              children={<WarningIcon color='red.500' />}
            />
          )}
          <Input
            id='email'
            placeholder='Email'
            type='email'
            fontSize='10pt'
            _placeholder={{ color: 'gray.500' }}
            _hover={{
              bg: 'white',
              border: '1px solid',
              borderColor: 'blue.500',
            }}
            _focus={{
              outline: 'none',
              bg: 'white',
              border: '1px solid',
              borderColor: 'blue.500',
            }}
            bg='gray.50'
            {...register('email')}
          />
        </InputGroup>
        <FormErrorMessage mb={2}>
          {errors.email && errors.email.message?.toString()}
          {error &&
            FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={Boolean(errors.password)} mb={2}>
        <InputGroup>
          {errors.password && (
            <InputRightElement
              pointerEvents='none'
              children={<WarningIcon color='red.500' />}
            />
          )}
          <Input
            id='password'
            placeholder='Mot de passe'
            type='password'
            fontSize='10pt'
            _placeholder={{ color: 'gray.500' }}
            _hover={{
              bg: 'white',
              border: '1px solid',
              borderColor: 'blue.500',
            }}
            _focus={{
              outline: 'none',
              bg: 'white',
              border: '1px solid',
              borderColor: 'blue.500',
            }}
            bg='gray.50'
            {...register('password')}
          />
        </InputGroup>
        <FormErrorMessage mb={2}>
          {errors.password && errors.password.message?.toString()}
        </FormErrorMessage>
      </FormControl>
      <Text textAlign='center' color='red.500' fontSize='10pt'>
        {error &&
          FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
      </Text>
      <Button
        width='100%'
        height='36px'
        mt={2}
        mb={2}
        type='submit'
        isLoading={loading}
      >
        Se connecter
      </Button>
      <Flex justifyContent='center' mb={2}>
        <Text fontSize='9pt' mr={1}>
          Mot de passe oublié ?
        </Text>
        <Text
          fontSize='9pt'
          color='blue.500'
          cursor='pointer'
          onClick={() => toggleView('resetPassword')}
        >
          Réinitialiser
        </Text>
      </Flex>
      <Flex fontSize='9pt' justifyContent='center'>
        <Text mr={1}>Première fois sur Reddit ?</Text>
        <Text
          color='blue.500'
          fontWeight='700'
          cursor='pointer'
          onClick={() => toggleView('signup')}
        >
          S'inscrire
        </Text>
      </Flex>
    </form>
  );
};
export default Login;
