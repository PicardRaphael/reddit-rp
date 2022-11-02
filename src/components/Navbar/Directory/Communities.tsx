import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useRecoilValue } from 'recoil';
import { communityState } from '../../../atoms/communitiesAtom';
import { communityModalState } from '../../../atoms/communityModalAtom';
import { auth } from '../../../firebase/clientApp';
import CreateCommunityModal from '../../Modal/Auth/CreateCommunity/CreateCommunity';
import ModeratingCommunities from './ModeratingCommunities';
import MyCommunities from './MyCommunities';

const Communities = () => {
  const [user] = useAuthState(auth);
  const [modalState, setModalState] = useRecoilState(communityModalState);
  const snippetState = useRecoilValue(communityState).mySnippets;

  return (
    <>
      <CreateCommunityModal
        isOpen={modalState.open}
        handleClose={() => setModalState({ open: false })}
        userId={user?.uid!}
      />
      <ModeratingCommunities
        snippets={snippetState.filter((item) => item.isModerator)}
      />
      <MyCommunities
        snippets={snippetState}
        openHandler={() => setModalState({ open: true })}
      />
    </>
  );
};
export default Communities;
