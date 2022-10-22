import { Flex } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';
import { authModalState } from '../../../atoms/authModalAtom';

type AuthInputsProps = {};

const AuthInputs: React.FC<AuthInputsProps> = () => {
  const modalState = useRecoilValue(authModalState);

  interface Inputs {
    login: ReactNode;
    signup: ReactNode;
  }
  const getInput = () =>
    ({
      login: <h1>Login</h1>,
      signup: <h1>Sing up</h1>,
    } as Inputs);

  return (
    <Flex direction='column' align='center' width='100%' mt={4}>
      {getInput()[modalState.view as keyof Inputs]}
    </Flex>
  );
};
export default AuthInputs;
