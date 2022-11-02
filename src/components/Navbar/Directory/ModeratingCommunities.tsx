import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { FaReddit } from 'react-icons/fa';
import { CommunitySnippet } from '../../../types/communities.types';
import MenuListItem from './MenuListItem';

type ModeratingCommunitiesProps = {
  snippets: CommunitySnippet[];
};

const ModeratingCommunities: React.FC<ModeratingCommunitiesProps> = ({
  snippets,
}: ModeratingCommunitiesProps) => {
  return (
    <Box mt={3} mb={4}>
      <Text pl={3} mb={1} fontSize='7pt' fontWeight={500} color='gray.500'>
        Modérées
      </Text>
      {snippets.map((snippet) => (
        <MenuListItem
          key={snippet.communityId}
          displayText={`r/${snippet.communityId}`}
          link={`/r/${snippet.communityId}`}
          icon={FaReddit}
          iconColor='brand.100'
        />
      ))}
    </Box>
  );
};
export default ModeratingCommunities;
