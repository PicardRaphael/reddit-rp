import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { ReactNode } from 'react';

type ModalWrapperProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const ModalWrapper = ({ children, isOpen, onClose }: ModalWrapperProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size='lg'>
        <ModalOverlay />
        <ModalContent width={{ base: 'sm', md: 'xl' }}>{children}</ModalContent>
      </Modal>
    </>
  );
};
export default ModalWrapper;
