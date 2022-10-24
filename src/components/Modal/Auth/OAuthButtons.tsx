import { Button, Flex, Image, Text } from '@chakra-ui/react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/clientApp';

const OAuthButtons = () => {
  const [signInWitchGoogle, user, loading, error] = useSignInWithGoogle(auth);
  return (
    <Flex direction='column' width='100%' mb={4}>
      <Button
        variant='oauth'
        mb={2}
        isLoading={loading}
        onClick={() => signInWitchGoogle()}
      >
        <Image alt='google' src='/images/googlelogo.png' height='20px' mr={4} />
        Continuer avec Google
      </Button>
      {/* <Button variant='oauth'>Autre fournisseur</Button> */}
      {error && <Text>{error.message}</Text>}
    </Flex>
  );
};
export default OAuthButtons;
