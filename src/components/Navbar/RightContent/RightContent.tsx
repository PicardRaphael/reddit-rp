import { Button, Flex } from '@chakra-ui/react';
import { signOut, User } from 'firebase/auth';
import { auth } from '../../../firebase/clientApp';
import AuthModal from '../../Modal/Auth/AuthModal';
import AuthButtons from './AuthButtons';

type RightContentProps = {
  user: User | null | undefined;
};

const RightContent = ({ user }: RightContentProps) => {
  return (
    <>
      <AuthModal />
      <Flex justify='center' align='center'>
        {user ? (
          <Button onClick={() => signOut(auth)}>Se déconnecter</Button>
        ) : (
          <AuthButtons />
        )}
      </Flex>
    </>
  );
};
export default RightContent;
