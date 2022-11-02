import { Stack } from '@chakra-ui/react';
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  where,
} from 'firebase/firestore';
import type { NextPage } from 'next';
import { useCallback, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilValue } from 'recoil';
import { communityState } from '../src/atoms/communitiesAtom';
import CreatePostLink from '../src/components/Community/CreatePostLink';
import PersonalHome from '../src/components/Community/PersonalHome';
import Premium from '../src/components/Community/Prenium';
import Recommendations from '../src/components/Community/Recommendations';
import PageContentLayout from '../src/components/Layout/PageContent';
import PostItem from '../src/components/Posts/PostItem';
import PostLoader from '../src/components/Posts/PostLoader';
import { auth, firestore } from '../src/firebase/clientApp';
import usePosts from '../src/hooks/usePosts';
import { Post, PostVote } from '../src/types/post.types';

const Home: NextPage = () => {
  const [user, loadingUser] = useAuthState(auth);
  const {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
    loading,
    setLoading,
  } = usePosts();
  const communityStateValue = useRecoilValue(communityState);

  const getUserHomePosts = useCallback(async () => {
    setLoading(true);
    try {
      const feedPosts: Post[] = [];

      if (communityStateValue.mySnippets.length) {
        const myCommunityIds = communityStateValue.mySnippets.map(
          (snippet) => snippet.communityId
        );

        let postPromises: Array<Promise<QuerySnapshot<DocumentData>>> = [];
        [0, 1, 2].forEach((index) => {
          if (!myCommunityIds[index]) return;

          postPromises.push(
            getDocs(
              query(
                collection(firestore, 'posts'),
                where('communityId', '==', myCommunityIds[index]),
                limit(3)
              )
            )
          );
        });
        const queryResults = await Promise.all(postPromises);
        queryResults.forEach((result) => {
          const posts = result.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Post[];
          feedPosts.push(...posts);
        });
      } else {
        const postQuery = query(
          collection(firestore, 'posts'),
          orderBy('voteStatus', 'desc'),
          limit(10)
        );
        const postDocs = await getDocs(postQuery);
        const posts = postDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Post[];
        feedPosts.push(...posts);
      }
      setPostStateValue((prev) => ({
        ...prev,
        posts: feedPosts,
      }));
    } catch (error: any) {
      console.log('getUserHomePosts error', error.message);
    }
    setLoading(false);
  }, [communityStateValue.mySnippets, setLoading, setPostStateValue]);

  const getNoUserHomePosts = useCallback(async () => {
    setLoading(true);
    try {
      const postQuery = query(
        collection(firestore, 'posts'),
        orderBy('voteStatus', 'desc'),
        limit(10)
      );
      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
    } catch (error: any) {
      console.log('getNoUserHomePosts error', error.message);
    }
    setLoading(false);
  }, [setLoading, setPostStateValue]);

  const getUserPostVotes = useCallback(async () => {
    const postIds = postStateValue.posts.map((post) => post.id);
    const postVotesQuery = query(
      collection(firestore, `users/${user?.uid}/postVotes`),
      where('postId', 'in', postIds)
    );
    const unsubscribe = onSnapshot(postVotesQuery, (querySnapshot) => {
      const postVotes = querySnapshot.docs.map((postVote) => ({
        id: postVote.id,
        ...postVote.data(),
      }));

      setPostStateValue((prev) => ({
        ...prev,
        postVotes: postVotes as PostVote[],
      }));
    });

    return () => unsubscribe();
  }, [postStateValue.posts, setPostStateValue, user?.uid]);

  useEffect(() => {
    if (!communityStateValue.initSnippetsFetched) return;

    if (user) {
      getUserHomePosts();
    }
  }, [user, communityStateValue.initSnippetsFetched, getUserHomePosts]);

  useEffect(() => {
    if (!user && !loadingUser) {
      getNoUserHomePosts();
    }
  }, [user, loadingUser, getNoUserHomePosts]);

  useEffect(() => {
    if (!user?.uid || !postStateValue.posts.length) return;
    getUserPostVotes();

    return () => {
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: [],
      }));
    };
  }, [getUserPostVotes, postStateValue.posts, setPostStateValue, user?.uid]);

  return (
    <PageContentLayout>
      <>
        <CreatePostLink />
        {loading ? (
          <PostLoader />
        ) : (
          <Stack>
            {postStateValue.posts.map((post: Post, index) => (
              <PostItem
                key={post.id}
                post={post}
                postIdx={index}
                onVote={onVote}
                onDeletePost={onDeletePost}
                userVoteValue={
                  postStateValue.postVotes.find(
                    (item) => item.postId === post.id
                  )?.voteValue
                }
                userIsCreator={user?.uid === post.creatorId}
                onSelectPost={onSelectPost}
                homePage
              />
            ))}
          </Stack>
        )}
      </>
      <Stack spacing={5} position='sticky' top='14px'>
        <Recommendations />
        <Premium />
        <PersonalHome />
      </Stack>
    </PageContentLayout>
  );
};

export default Home;
