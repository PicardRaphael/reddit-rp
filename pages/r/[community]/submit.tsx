import { Box, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilValue } from 'recoil';
import { communityState } from '../../../src/atoms/communitiesAtom';
import PageContentLayout from '../../../src/components/Layout/PageContent';
import NewPostForm from '../../../src/components/Posts/PostForm/NewPostForm';
import { auth } from '../../../src/firebase/clientApp';

const CreateCommmunityPostPage: NextPage = () => {
  const [user, loadingUser, error] = useAuthState(auth);
  const router = useRouter();
  const { community } = router.query;
  const communityStateValue = useRecoilValue(communityState);

  useEffect(() => {
    if (!user && !loadingUser && communityStateValue.currentCommunity.id) {
      router.push(`/r/${community}`);
    }
  }, [
    community,
    communityStateValue.currentCommunity.id,
    loadingUser,
    router,
    user,
  ]);

  return (
    <PageContentLayout maxWidth='1060px'>
      <>
        <Box p='14px 0px' borderBottom='1px solid' borderColor='white'>
          <Text fontWeight={600}>Créer une publication</Text>
        </Box>
        {user && (
          <NewPostForm
            communityId={communityStateValue.currentCommunity.id}
            communityImageURL={communityStateValue.currentCommunity.imageURL}
            user={user}
          />
        )}
      </>
      <>
        <div>TOto</div>
      </>
      {/* {communityStateValue.currentCommunity && (
        <>
          <About
            communityData={communityStateValue.currentCommunity}
            pt={6}
            onCreatePage
            loading={loading}
          />
        </>
      )} */}
    </PageContentLayout>
  );
};

export default CreateCommmunityPostPage;
