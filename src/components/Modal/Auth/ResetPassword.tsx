import { WarningIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BsDot, BsReddit } from 'react-icons/bs';
import { useSetRecoilState } from 'recoil';
import { authModalState, ModalView } from '../../../atoms/authModalAtom';
import { auth } from '../../../firebase/clientApp';
import { FormResetPasswordValues } from '../../../types/auth.types';
import { resetPasswordSchema } from '../../../utils/authSchema';
type ResetPasswordProps = {
  toggleView: (view: ModalView) => void;
};

const ResetPassword = ({ toggleView }: ResetPasswordProps) => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormResetPasswordValues>({
    resolver: yupResolver(resetPasswordSchema),
  });

  const [success, setSuccess] = useState(false);

  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const onSubmit: SubmitHandler<FormResetPasswordValues> = async (values) => {
    await sendPasswordResetEmail(values.email);
    setSuccess(true);
  };

  return (
    <Flex direction='column' alignItems='center' width='100%'>
      <Icon as={BsReddit} color='brand.100' fontSize={40} mb={2} />
      <Text fontWeight={700} mb={2}>
        Réinitialiser votre mot de passe
      </Text>
      {success ? (
        <Text mb={4}>Vérifiez votre e-mail :)</Text>
      ) : (
        <>
          <Text fontSize='sm' textAlign='center' mb={2}>
            Saisissez l'e-mail associée à votre compte et nous vous enverrons un
            lien de réinitialisation
          </Text>
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
                {error?.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              width='100%'
              height='36px'
              mb={2}
              mt={2}
              type='submit'
              isLoading={sending}
            >
              Réinitialiser le mot de passe
            </Button>
          </form>
        </>
      )}
      <Flex
        alignItems='center'
        fontSize='9pt'
        color='blue.500'
        fontWeight={700}
        cursor='pointer'
      >
        <Text onClick={() => toggleView('login')}>Se connecter</Text>
        <Icon as={BsDot} />
        <Text onClick={() => toggleView('signup')}>S'inscrire</Text>
      </Flex>
    </Flex>
  );
};
export default ResetPassword;
