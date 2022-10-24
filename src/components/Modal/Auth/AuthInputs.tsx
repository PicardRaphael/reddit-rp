import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';
import { authModalState, ModalView } from '../../../atoms/authModalAtom';
import Login from './Login';
import SignUp from './SignUp';

type AuthInputsProps = { toggleView: (view: ModalView) => void };

const AuthInputs = ({ toggleView }: AuthInputsProps) => {
  const modalState = useRecoilValue(authModalState);

  interface Inputs {
    login: ReactNode;
    signup: ReactNode;
  }
  const getInput = () =>
    ({
      login: <Login toggleView={toggleView} />,
      signup: <SignUp toggleView={toggleView} />,
    } as Inputs);

  return (
    <Flex direction='column' align='center' width='100%' mt={4}>
      {getInput()[modalState.view as keyof Inputs]}
    </Flex>
  );
};
export default AuthInputs;
