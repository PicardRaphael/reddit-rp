import { Flex } from '@chakra-ui/react';
import AuthModal from '../../Modal/Auth/AuthModal';
import AuthButtons from './AuthButtons';

type RightContentProps = {
  // user: any;
};

const RightContent = ({}: RightContentProps) => {
  return (
    <>
      <AuthModal />
      <Flex justify='center' align='center'>
        <AuthButtons />
      </Flex>
    </>
  );
};
export default RightContent;
