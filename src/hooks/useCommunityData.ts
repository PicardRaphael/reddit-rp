import { doc, getDoc, increment, writeBatch } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { authModalState } from '../atoms/authModalAtom';
import { communityState, defaultCommunity } from '../atoms/communitiesAtom';
import { auth, firestore } from '../firebase/clientApp';
import { getMySnippets } from '../helpers/firestore';
import { Community, CommunitySnippet } from '../types/communities.types';

const useCommunityData = (ssrCommunityData?: boolean) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);
  const setAuthModalState = useSetRecoilState(authModalState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getSnippets = useCallback(async () => {
    setLoading(true);
    try {
      const snippets = await getMySnippets(user?.uid!);
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: snippets as CommunitySnippet[],
        initSnippetsFetched: true,
      }));
      setLoading(false);
    } catch (error: any) {
      console.log('Error getting user snippets', error);
      setError(error.message);
    }
    setLoading(false);
  }, [setCommunityStateValue, user?.uid]);

  useEffect(() => {
    if (!user || !!communityStateValue.mySnippets.length) return;

    getSnippets();
  }, [communityStateValue.mySnippets.length, getSnippets, user]);

  const getCommunityData = useCallback(
    async (communityId: string) => {
      try {
        const communityDocRef = doc(
          firestore,
          'communities',
          communityId as string
        );
        const communityDoc = await getDoc(communityDocRef);
        setCommunityStateValue((prev) => ({
          ...prev,
          currentCommunity: {
            id: communityDoc.id,
            ...communityDoc.data(),
          } as Community,
        }));
      } catch (error: any) {
        console.log('getCommunityData error', error.message);
      }
      setLoading(false);
    },
    [setCommunityStateValue]
  );

  const onJoinLeaveCommunity = (community: Community, isJoined?: boolean) => {
    if (!user) {
      setAuthModalState({ open: true, view: 'login' });
      return;
    }

    setLoading(true);
    if (isJoined) {
      leaveCommunity(community.id);
      return;
    }
    joinCommunity(community);
  };

  const joinCommunity = async (community: Community) => {
    try {
      const batch = writeBatch(firestore);

      const newSnippet: CommunitySnippet = {
        communityId: community.id,
        imageURL: community.imageURL || '',
      };
      batch.set(
        doc(
          firestore,
          `users/${user?.uid}/communitySnippets`,
          community.id // will for sure have this value at this point
        ),
        newSnippet
      );

      batch.update(doc(firestore, 'communities', community.id), {
        numberOfMembers: increment(1),
      });

      // perform batch writes
      await batch.commit();

      // Add current community to snippet
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet],
      }));
    } catch (error) {
      console.log('joinCommunity error', error);
    }
    setLoading(false);
  };

  const leaveCommunity = async (communityId: string) => {
    try {
      const batch = writeBatch(firestore);

      batch.delete(
        doc(firestore, `users/${user?.uid}/communitySnippets/${communityId}`)
      );

      batch.update(doc(firestore, 'communities', communityId), {
        numberOfMembers: increment(-1),
      });

      await batch.commit();

      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(
          (item) => item.communityId !== communityId
        ),
      }));
    } catch (error) {
      console.log('leaveCommunity error', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    // if (ssrCommunityData) return;
    const { community } = router.query;
    if (community) {
      const communityData = communityStateValue.currentCommunity;

      if (!communityData.id) {
        getCommunityData(community as string);
        return;
      }
    } else {
      setCommunityStateValue((prev) => ({
        ...prev,
        currentCommunity: defaultCommunity,
      }));
    }
  }, [
    router.query,
    communityStateValue.currentCommunity,
    getCommunityData,
    setCommunityStateValue,
  ]);

  return {
    communityStateValue,
    onJoinLeaveCommunity,
    loading,
    setLoading,
    error,
  };
};

export default useCommunityData;
