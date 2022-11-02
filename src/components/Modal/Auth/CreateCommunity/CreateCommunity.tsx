import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Icon,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Stack,
  Text,
} from '@chakra-ui/react';
import { doc, runTransaction, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BsFillEyeFill, BsFillPersonFill } from 'react-icons/bs';
import { HiLockClosed } from 'react-icons/hi';
import { useSetRecoilState } from 'recoil';

import { communityState } from '../../../../atoms/communitiesAtom';
import { firestore } from '../../../../firebase/clientApp';
import ModalWrapper from '../ModalWrapper';

type CreateCommunityModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  userId: string;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  isOpen,
  handleClose,
  userId,
}) => {
  const setSnippetState = useSetRecoilState(communityState);
  const [name, setName] = useState('');
  const [charsRemaining, setCharsRemaining] = useState(21);
  const [nameError, setNameError] = useState('');
  const [communityType, setCommunityType] = useState('public');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;
    setName(event.target.value);
    setCharsRemaining(21 - event.target.value.length);
  };

  const handleCreateCommunity = async () => {
    if (nameError) setNameError('');
    const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (format.test(name) || name.length < 3) {
      return setNameError(
        'Les noms des communautés doivent comporter entre 3 et 21 caractères et ne peuvent contenir que des lettres, des chiffres ou des underscores.'
      );
    }

    setLoading(true);
    try {
      const communityDocRef = doc(firestore, 'communities', name);
      await runTransaction(firestore, async (transaction) => {
        const communityDoc = await transaction.get(communityDocRef);
        if (communityDoc.exists()) {
          throw new Error(`Désolé, /r${name} est pris. Essayez-en un autre.`);
        }

        transaction.set(communityDocRef, {
          creatorId: userId,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: 'public',
        });

        transaction.set(
          doc(firestore, `users/${userId}/communitySnippets`, name),
          {
            communityId: name,
            isModerator: true,
          }
        );
      });
    } catch (error: any) {
      console.log('Transaction error', error);
      setNameError(error.message);
    }
    setSnippetState((prev) => ({
      ...prev,
      mySnippets: [],
    }));
    handleClose();

    if (router.pathname.includes('/r')) {
      router.push({ pathname: `${name}` });
    } else {
      router.push({ pathname: `r/${name}` });
    }
    setLoading(false);
  };

  const onCommunityTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      target: { name },
    } = event;
    if (name === communityType) return;
    setCommunityType(name);
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={handleClose}>
      <ModalHeader
        display='flex'
        flexDirection='column'
        fontSize={15}
        padding={3}
      >
        Créer une communauté
      </ModalHeader>
      <Box pr={3} pl={3}>
        <Divider />
        <ModalCloseButton />
        <ModalBody display='flex' flexDirection='column' padding='10px 0px'>
          <Text fontWeight={600} fontSize={15}>
            Titre
          </Text>
          <Text fontSize={11} color='gray.500'>
            Les noms de communauté, majuscules incluses, ne pourront pas être
            changés.
          </Text>
          <Text
            color='gray.400'
            position='relative'
            top='28px'
            left='10px'
            width='20px'
            zIndex={5}
          >
            r/
          </Text>
          <Input
            position='relative'
            name='name'
            value={name}
            onChange={handleChange}
            pl='22px'
            type={''}
            size='sm'
          />
          <Text
            fontSize='9pt'
            color={charsRemaining === 0 ? 'red' : 'gray.500'}
            pt={2}
          >
            {charsRemaining} caractères restants
          </Text>
          <Text fontSize='9pt' color='red' pt={1}>
            {nameError}
          </Text>
          <Box mt={4} mb={4}>
            <Text fontWeight={600} fontSize={15}>
              Type de communauté
            </Text>
            <Stack spacing={2} pt={1}>
              <Checkbox
                colorScheme='blue'
                name='public'
                isChecked={communityType === 'public'}
                onChange={onCommunityTypeChange}
              >
                <Flex alignItems='center'>
                  <Icon as={BsFillPersonFill} mr={2} color='gray.500' />
                  <Text fontSize='10pt' mr={1}>
                    Public
                  </Text>
                  <Text fontSize='8pt' color='gray.500' pt={1}>
                    Tout le monde peut voir, publier et commenter dans cette
                    communauté
                  </Text>
                </Flex>
              </Checkbox>
              <Checkbox
                colorScheme='blue'
                name='restricted'
                isChecked={communityType === 'restricted'}
                onChange={onCommunityTypeChange}
              >
                <Flex alignItems='center'>
                  <Icon as={BsFillEyeFill} color='gray.500' mr={2} />
                  <Text fontSize='10pt' mr={1}>
                    Restreinte
                  </Text>
                  <Text fontSize='8pt' color='gray.500' pt={1}>
                    N’importe qui peut voir cette communauté, mais uniquement
                    les membres approuvés peuvent Publier
                  </Text>
                </Flex>
              </Checkbox>
              <Checkbox
                colorScheme='blue'
                name='private'
                isChecked={communityType === 'private'}
                onChange={onCommunityTypeChange}
              >
                <Flex alignItems='center'>
                  <Icon as={HiLockClosed} color='gray.500' mr={2} />
                  <Text fontSize='10pt' mr={1}>
                    Privée
                  </Text>
                  <Text fontSize='8pt' color='gray.500' pt={1}>
                    Seuls les membres approuvés peuvent voir cette communauté et
                    y publier
                  </Text>
                </Flex>
              </Checkbox>
            </Stack>
          </Box>
        </ModalBody>
      </Box>
      <ModalFooter bg='gray.100' borderRadius='0px 0px 10px 10px'>
        <Button variant='outline' height='30px' mr={2} onClick={handleClose}>
          Annuler
        </Button>
        <Button
          variant='solid'
          height='30px'
          onClick={handleCreateCommunity}
          isLoading={loading}
        >
          Créer une communauté
        </Button>
      </ModalFooter>
    </ModalWrapper>
  );
};
export default CreateCommunityModal;
