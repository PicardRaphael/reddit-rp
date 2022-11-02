import { doc, getDoc } from 'firebase/firestore';
import type { GetServerSidePropsContext } from 'next';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';
import safeJsonStringify from 'safe-json-stringify';
import { communityState } from '../../../src/atoms/communitiesAtom';
import About from '../../../src/components/Community/About';
import CommunityNotFound from '../../../src/components/Community/CommunityNotFound';
import CreatePostLink from '../../../src/components/Community/CreatePostLink';
import Header from '../../../src/components/Community/Header';
import PageContent from '../../../src/components/Layout/PageContent';
import Posts from '../../../src/components/Posts/Posts';
import { auth, firestore } from '../../../src/firebase/clientApp';
import { Community } from '../../../src/types/communities.types';

type CommunityPageProps = {
  communityData: Community;
};

const CommunityPage = ({ communityData }: CommunityPageProps) => {
  const [user] = useAuthState(auth);

  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);

  useEffect(() => {
    setCommunityStateValue((prev) => ({
      ...prev,
      currentCommunity: communityData,
    }));
  }, [communityData, setCommunityStateValue]);

  if (!communityData) return <CommunityNotFound />;
  return (
    <>
      <Header communityData={communityData} />
      <PageContent>
        <>
          <CreatePostLink />
          <Posts communityData={communityData} userId={user?.uid} />
        </>
        <>
          <About communityData={communityData} />
        </>
      </PageContent>
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const communityDocRef = doc(
      firestore,
      'communities',
      context.query.community as string
    );
    const communityDoc = await getDoc(communityDocRef);
    console.log('communityDoc,', communityDocRef);
    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
            )
          : '',
      },
    };
  } catch (error) {
    console.log('getServerSideProps error', error);
    return {
      props: {},
    };
  }
};
export default CommunityPage;
