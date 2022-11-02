import { Box, Flex, Icon, Spinner, Stack, Text } from '@chakra-ui/react';
import moment from 'moment';
import { FaReddit } from 'react-icons/fa';
import {
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
} from 'react-icons/io5';
import { Comment } from '../../../types/comment.types';

type CommentItemProps = {
  comment: Comment;
  onDeleteComment: (comment: Comment) => void;
  isLoading: boolean;
  userId?: string;
};

const CommentItem = ({
  comment,
  onDeleteComment,
  isLoading,
  userId,
}: CommentItemProps) => {
  return (
    <Flex>
      <Box mr={2}>
        <Icon as={FaReddit} fontSize={30} color='gray.300' />
      </Box>
      <Stack spacing={1}>
        <Stack direction='row' align='center' spacing={2} fontSize='8pt'>
          <Text
            fontWeight={700}
            _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
          >
            {comment.creatorDisplayText}
          </Text>
          {comment.createdAt?.seconds && (
            <Text color='gray.600'>
              {moment(new Date(comment.createdAt?.seconds * 1000)).fromNow()}
            </Text>
          )}
          {isLoading && <Spinner size='sm' />}
        </Stack>
        <Text fontSize='10pt'>{comment.text}</Text>
        <Stack
          direction='row'
          align='center'
          cursor='pointer'
          fontWeight={600}
          color='gray.500'
        >
          <Icon as={IoArrowUpCircleOutline} />
          <Icon as={IoArrowDownCircleOutline} />
          {userId === comment.creatorId && (
            <>
              <Text fontSize='9pt' _hover={{ color: 'blue.500' }}>
                Modifier
              </Text>
              <Text
                fontSize='9pt'
                _hover={{ color: 'blue.500' }}
                onClick={() => onDeleteComment(comment)}
              >
                Supprimer
              </Text>
            </>
          )}
        </Stack>
      </Stack>
    </Flex>
  );
};
export default CommentItem;
