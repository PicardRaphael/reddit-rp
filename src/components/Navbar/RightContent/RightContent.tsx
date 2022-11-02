import { Flex } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import AuthModal from '../../Modal/Auth/AuthModal';
import AuthButtons from './AuthButtons';
import Icons from './Icons';
import MenuWrapper from './ProfileMenu/MenuWrapper';

type RightContentProps = {
  user?: User | null;
};

const RightContent = ({ user }: RightContentProps) => {
  return (
    <>
      <AuthModal />
      <Flex justify='center' align='center'>
        {user ? <Icons /> : <AuthButtons />}
        <MenuWrapper />
      </Flex>
    </>
  );
};
export default RightContent;
