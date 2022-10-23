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
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '../../../atoms/authModalAtom';
import { FormSignUpValues } from '../../../types/auth.types';
import { signUpSchema } from '../../../utils/authSchema';

const SignUp = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormSignUpValues>({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<FormSignUpValues> = (values) => {
    console.log(values);
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
      <FormControl isInvalid={Boolean(errors.confirmPassword)} mb={2}>
        <InputGroup>
          {errors.confirmPassword && (
            <InputRightElement
              pointerEvents='none'
              children={<WarningIcon color='red.500' />}
            />
          )}
          <Input
            id='confirmPassword'
            placeholder='Confirmez le mot de passe'
            type='confirmPassword'
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
            {...register('confirmPassword')}
          />
        </InputGroup>
        <FormErrorMessage mb={2}>
          {errors.confirmPassword && errors.confirmPassword.message?.toString()}
        </FormErrorMessage>
      </FormControl>
      <Button
        width='100%'
        height='36px'
        mt={2}
        mb={2}
        type='submit'
        isLoading={isSubmitting}
      >
        S'inscrire
      </Button>
      <Flex fontSize='9pt' justifyContent='center'>
        <Text mr={1}>Déjà Redditor ?</Text>
        <Text
          color='blue.500'
          fontWeight='700'
          cursor='pointer'
          onClick={() =>
            setAuthModalState((prev) => ({ ...prev, view: 'login' }))
          }
        >
          Se Connecter
        </Text>
      </Flex>
    </form>
  );
};
export default SignUp;
