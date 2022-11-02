import { Box, Flex, Icon, MenuItem, Text } from '@chakra-ui/react';
import React from 'react';
import { FaReddit } from 'react-icons/fa';
import { GrAdd } from 'react-icons/gr';
import { CommunitySnippet } from '../../../types/communities.types';
import MenuListItem from './MenuListItem';

type MyCommunitiesCommunitiesProps = {
  openHandler: () => void;
  snippets: CommunitySnippet[];
};

const MyCommunities: React.FC<MyCommunitiesCommunitiesProps> = ({
  openHandler,
  snippets,
}) => {
  return (
    <Box mt={3} mb={4}>
      <Text
        pl={3}
        mb={1}
        fontSize='7pt'
        fontWeight={500}
        color='gray.500'
        textTransform='uppercase'
      >
        Vos communauté
      </Text>
      <MenuItem
        width='100%'
        fontSize='10pt'
        _hover={{ bg: 'gray.100' }}
        onClick={openHandler}
      >
        <Flex alignItems='center'>
          <Icon fontSize={20} mr={2} as={GrAdd} />
          Créer une communauté
        </Flex>
      </MenuItem>
      {snippets.map((snippet) => (
        <MenuListItem
          key={snippet.communityId}
          icon={FaReddit}
          displayText={`r/${snippet.communityId}`}
          link={`/r/${snippet.communityId}`}
          iconColor='blue.500'
          imageURL={snippet.imageURL}
        />
      ))}
    </Box>
  );
};

export default MyCommunities;
