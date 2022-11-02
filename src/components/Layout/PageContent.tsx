import { Box, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface PageContentLayoutProps {
  maxWidth?: string;
  children: ReactNode[];
}

const PageContentLayout = ({ children, maxWidth }: PageContentLayoutProps) => {
  return (
    <Flex justify='center' p='16px 0px'>
      <Flex width='95%' justify='center' maxWidth={maxWidth || '960px'}>
        <Flex
          direction='column'
          width={{ base: '100%', md: '65%' }}
          mr={{ base: 0, md: 6 }}
        >
          {children && children[0]}
        </Flex>
        <Box
          display={{ base: 'none', md: 'flex' }}
          flexDirection='column'
          flexGrow={1}
        >
          {children && children[1]}
        </Box>
      </Flex>
    </Flex>
  );
};

export default PageContentLayout;
