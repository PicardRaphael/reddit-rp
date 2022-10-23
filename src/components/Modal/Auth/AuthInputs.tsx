import { Flex } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';
import { authModalState } from '../../../atoms/authModalAtom';
import Login from './Login';
import SignUp from './SignUp';

type AuthInputsProps = {};

const AuthInputs: React.FC<AuthInputsProps> = () => {
  const modalState = useRecoilValue(authModalState);

  interface Inputs {
    login: ReactNode;
    signup: ReactNode;
  }
  const getInput = () =>
    ({
      login: <Login />,
      signup: <SignUp />,
    } as Inputs);

  return (
    <Flex direction='column' align='center' width='100%' mt={4}>
      {getInput()[modalState.view as keyof Inputs]}
    </Flex>
  );
};
export default AuthInputs;
