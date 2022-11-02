import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import About from '../../../../src/components/Community/About';
import PageContentLayout from '../../../../src/components/Layout/PageContent';
import Comments from '../../../../src/components/Posts/Comments/Comments';
import PostItem from '../../../../src/components/Posts/PostItem';
import PostLoader from '../../../../src/components/Posts/PostLoader';
import { auth, firestore } from '../../../../src/firebase/clientApp';
import useCommunityData from '../../../../src/hooks/useCommunityData';
import usePosts from '../../../../src/hooks/usePosts';
import { Post } from '../../../../src/types/post.types';

const PostPage = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { community, pid } = router.query;
  const { communityStateValue } = useCommunityData();

  const {
    postStateValue,
    setPostStateValue,
    onDeletePost,
    loading,
    setLoading,
    onVote,
  } = usePosts(communityStateValue.currentCommunity);

  const fetchPost = useCallback(() => {
    async () => {
      setLoading(true);
      try {
        const postDocRef = doc(firestore, 'posts', pid as string);
        const postDoc = await getDoc(postDocRef);
        setPostStateValue((prev) => ({
          ...prev,
          selectedPost: { id: postDoc.id, ...postDoc.data() } as Post,
        }));
      } catch (error: any) {
        console.log('fetchPost error', error.message);
      }
      setLoading(false);
    };
  }, [pid, setLoading, setPostStateValue]);

  useEffect(() => {
    const { pid } = router.query;

    if (pid && !postStateValue.selectedPost) {
      fetchPost();
    }
  }, [router.query, postStateValue.selectedPost, fetchPost]);

  return (
    <PageContentLayout>
      <>
        {loading ? (
          <PostLoader />
        ) : (
          <>
            {postStateValue.selectedPost && (
              <>
                <PostItem
                  post={postStateValue.selectedPost}
                  onVote={onVote}
                  onDeletePost={onDeletePost}
                  userVoteValue={
                    postStateValue.postVotes.find(
                      (item) => item.postId === postStateValue.selectedPost!.id
                    )?.voteValue
                  }
                  userIsCreator={
                    user?.uid === postStateValue.selectedPost.creatorId
                  }
                  router={router}
                />
                <Comments
                  user={user}
                  community={community as string}
                  selectedPost={postStateValue.selectedPost}
                />
              </>
            )}
          </>
        )}
      </>
      {/* Right Content */}
      <>
        <About
          communityData={communityStateValue.currentCommunity}
          loading={loading}
        />
      </>
    </PageContentLayout>
  );
};
export default PostPage;
