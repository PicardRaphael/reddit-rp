import { Flex, Icon, MenuItem } from '@chakra-ui/react';
import React from 'react';
import { MdOutlineLogin } from 'react-icons/md';
import { AuthModalState } from '../../../../types/auth.types';

type NoUserListProps = {
  setModalState: (value: AuthModalState) => void;
};

const NoUserList: React.FC<NoUserListProps> = ({ setModalState }) => {
  return (
    <>
      <MenuItem
        fontSize='10pt'
        fontWeight={700}
        _hover={{ bg: 'blue.500', color: 'white' }}
        onClick={() => setModalState({ open: true, view: 'login' })}
      >
        <Flex alignItems='center'>
          <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
          Se connecter / S'inscrire
        </Flex>
      </MenuItem>
    </>
  );
};
export default NoUserList;
