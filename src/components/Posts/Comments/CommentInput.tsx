import { Button, Flex, Text, Textarea } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import AuthButtons from '../../Navbar/RightContent/AuthButtons';

type CommentInputProps = {
  comment: string;
  setComment: (value: string) => void;
  loading: boolean;
  user?: User | null;
  onCreateComment: (comment: string) => void;
};

const CommentInput = ({
  comment,
  setComment,
  loading,
  user,
  onCreateComment,
}: CommentInputProps) => {
  return (
    <Flex direction='column' position='relative'>
      {user ? (
        <>
          <Text mb={1}>
            Commenter en tant que{' '}
            <span style={{ color: '#3182CE' }}>
              {user?.email?.split('@')[0]}
            </span>
          </Text>
          <Textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            fontSize='10pt'
            borderRadius={4}
            minHeight='160px'
            pb={10}
            _placeholder={{ color: 'gray.500' }}
            _focus={{
              outline: 'none',
              bg: 'white',
              border: '1px solid black',
            }}
          />
          <Flex
            position='absolute'
            left='1px'
            right={0.1}
            bottom='1px'
            justify='flex-end'
            bg='gray.100'
            p='6px 8px'
            borderRadius='0px 0px 4px 4px'
          >
            <Button
              height='26px'
              disabled={!comment.length}
              isLoading={loading}
              onClick={() => onCreateComment(comment)}
            >
              Commentaire
            </Button>
          </Flex>
        </>
      ) : (
        <Flex
          align='center'
          justify='space-between'
          borderRadius={2}
          border='1px solid'
          borderColor='gray.100'
          p={4}
        >
          <Text fontWeight={600}>
            Vous pouvez commenter n'importe quelle publication avec un compte
            Reddit.
          </Text>
          <AuthButtons />
        </Flex>
      )}
    </Flex>
  );
};
export default CommentInput;
