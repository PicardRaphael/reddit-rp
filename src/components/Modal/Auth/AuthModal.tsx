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
import { useCallback, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';
import { authModalState } from '../../../atoms/authModalAtom';
import { auth } from '../../../firebase/clientApp';
import AuthInputs from './AuthInputs';
import OAuthButtons from './OAuthButtons';
import ResetPassword from './ResetPassword';

const AuthModal = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const [user, loading, error] = useAuthState(auth);

  const handleClose = useCallback(() => {
    setModalState((prev) => ({ ...prev, open: false }));
  }, [setModalState]);

  enum TitleModal {
    login = 'Se connecter',
    signup = "S'inscrire",
    resetPassword = 'Réinitialisez votre mot de passe',
  }

  const toggleView = (view: string) => {
    setModalState({
      ...modalState,
      view: view as typeof modalState.view,
    });
  };
  useEffect(() => {
    if (user) handleClose();
  }, [handleClose, user]);

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
              {' '}
              {modalState.view === 'login' || modalState.view === 'signup' ? (
                <>
                  <OAuthButtons />
                  <Flex
                    width='100%'
                    alignItems='center'
                    justifyContent='space-between'
                  >
                    <Box width='40%' as='span' height='1px' bg='gray.300' />
                    <Text
                      textTransform='uppercase'
                      color='gray.500'
                      fontSize='sm'
                      fontWeight={700}
                    >
                      ou
                    </Text>
                    <Box as='span' width='40%' height='1px' bg='gray.300' />
                  </Flex>
                  <AuthInputs toggleView={toggleView} />
                </>
              ) : (
                <ResetPassword toggleView={toggleView} />
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AuthModal;
