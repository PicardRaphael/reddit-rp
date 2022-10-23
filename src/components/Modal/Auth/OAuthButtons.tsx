import { Button, Flex, Image } from '@chakra-ui/react';

const OAuthButtons = () => {
  return (
    <Flex direction='column' width='100%' mb={4}>
      <Button variant='oauth' mb={2}>
        <Image alt='google' src='/images/googlelogo.png' height='20px' mr={4}/>
        Continuer avec Google
      </Button>
      <Button variant='oauth'>Autre fournisseur</Button>
    </Flex>
  );
};
export default OAuthButtons;
