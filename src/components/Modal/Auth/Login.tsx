import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

type LoginProps = {};

const Login = ({}: LoginProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={Boolean(errors.email)}>
        <Input
          id='email'
          placeholder='email'
          type='email'
          mb={2}
          {...register('email', {
            required: 'Email obligatoire',
          })}
        />
        <FormErrorMessage>
          {errors.email && errors.email.message?.toString()}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={Boolean(errors.email)}>
        <Input
          id='password'
          placeholder='Mot de passe'
          type='password'
          mb={2}
          {...register('password', {
            required: 'Mot de passe obligatoire',
          })}
        />
        <FormErrorMessage>
          {errors.password && errors.password.message?.toString()}
        </FormErrorMessage>
      </FormControl>
      <Button type='submit' isLoading={isSubmitting}>Se connecter</Button>
    </form>
  );
};
export default Login;
