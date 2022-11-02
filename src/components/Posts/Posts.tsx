import { Stack } from '@chakra-ui/react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { firestore } from '../../firebase/clientApp';
import usePosts from '../../hooks/usePosts';
import { Community } from '../../types/communities.types';
import { Post } from '../../types/post.types';
import PostItem from './PostItem';
import PostLoader from './PostLoader';

type PostsProps = {
  communityData: Community;
  userId?: string;
};

const Posts = ({ communityData, userId }: PostsProps) => {
  const [loading, setLoading] = useState(false);
  const { postStateValue, setPostStateValue, onVote, onDeletePost } =
    usePosts();
  const router = useRouter();

  const getPosts = useCallback(async () => {
    setLoading(true);
    try {
      const postsQuery = query(
        collection(firestore, 'posts'),
        where('communityId', '==', communityData?.id!),
        orderBy('createdAt', 'desc')
      );
      const postDocs = await getDocs(postsQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
        postsCache: {
          ...prev.postsCache,
          [communityData?.id!]: posts as Post[],
        },
        postUpdateRequired: false,
      }));
    } catch (error: any) {
      console.log('getPosts error', error.message);
    }
    setLoading(false);
  }, [communityData?.id, setPostStateValue]);

  useEffect(() => {
    if (
      postStateValue.postsCache[communityData?.id!] &&
      !postStateValue.postUpdateRequired
    ) {
      setPostStateValue((prev) => ({
        ...prev,
        posts: postStateValue.postsCache[communityData?.id!],
      }));
      return;
    }

    getPosts();
  }, [
    communityData,
    getPosts,
    postStateValue.postUpdateRequired,
    postStateValue.postsCache,
    setPostStateValue,
  ]);

  const onSelectPost = (post: Post, postIdx: number) => {
    setPostStateValue((prev) => ({
      ...prev,
      selectedPost: { ...post, postIdx },
    }));
    router.push(`/r/${communityData?.id!}/comments/${post.id}`);
  };

  return (
    <>
      {loading ? (
        <PostLoader />
      ) : (
        <Stack>
          {postStateValue.posts.map((post: Post, index) => (
            <PostItem
              key={post.id}
              post={post}
              onVote={onVote}
              onDeletePost={onDeletePost}
              userVoteValue={
                postStateValue.postVotes.find((item) => item.postId === post.id)
                  ?.voteValue
              }
              userIsCreator={userId === post.creatorId}
              onSelectPost={onSelectPost}
            />
          ))}
        </Stack>
      )}
    </>
  );
};
export default Posts;
