import { Button, Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { communityModalState } from '../../atoms/communityModalAtom';

const CommunityNotFound: React.FC = () => {
  const setModalState = useSetRecoilState(communityModalState);
  return (
    <Flex
      direction='column'
      justifyContent='center'
      alignItems='center'
      minHeight='60vh'
    >
      <Text fontWeight={700}>
        Désolé, il n'y a aucune communauté sur Reddit avec ce nom.
      </Text>
      <Text>
        Cette communauté a peut-être été ban ou le nom de la communauté est
        incorrect.
      </Text>
      <Flex mt={4} gap={2}>
        <Button onClick={() => setModalState({ open: true })} variant='outline'>
          Créer une communauté
        </Button>
        <Link href='/'>
          <Button textTransform='uppercase'>Retourner à l'accueil</Button>
        </Link>
      </Flex>
    </Flex>
  );
};
export default CommunityNotFound;
