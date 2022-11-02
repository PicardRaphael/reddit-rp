import { Flex, Image, Link } from '@chakra-ui/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/clientApp';
import Directory from './Directory/Directory';
import RightContent from './RightContent/RightContent';
import SearchInput from './SearchInput';

const Navbar = () => {
  const [user] = useAuthState(auth);
  return (
    <Flex bg='white' height='44px' padding='6px 12px'>
      <Link href='/' display='flex' alignItems='center'>
        <Image alt='' src='/images/redditFace.svg' height='32px' />
        <Image
          alt=''
          src='/images/redditText.svg'
          height='46px'
          display={{ base: 'none', md: 'unset' }}
        />
      </Link>
      {user && <Directory />}
      <SearchInput />
      <RightContent user={user} />
    </Flex>
  );
};
export default Navbar;
