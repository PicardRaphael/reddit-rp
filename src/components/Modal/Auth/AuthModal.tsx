import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { authModalState } from '../../../atoms/authModalAtom';
import AuthInputs from './AuthInputs';
import OAuthButtons from './OAuthButtons';

const AuthModal = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);

  const handleClose = () => setModalState((prev) => ({ ...prev, open: false }));

  enum TitleModal {
    login = 'Se connecter',
    signup = "S'inscrire",
    resetPassword = 'Réinitialisez votre mot de passe',
  }

  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign='center'>
            {TitleModal[modalState.view as keyof typeof TitleModal]}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            pb={6}
          >
            <Flex
              direction='column'
              align='center'
              justify='center'
              width='70%'
            >
              <OAuthButtons />
              <Flex width='100%' alignItems='center' justifyContent='space-between'>
                <Box width='40%' as='span' height='1px' bg='gray.300' />
                <Text textTransform='uppercase' color='gray.500' fontSize='sm' fontWeight={700}>
                  ou
                </Text>
                <Box as='span' width='40%' height='1px' bg='gray.300' />
              </Flex>
              <AuthInputs />
              {/* <ResetPassword /> */}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AuthModal;
