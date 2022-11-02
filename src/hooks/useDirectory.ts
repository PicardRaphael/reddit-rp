import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FaReddit } from 'react-icons/fa';
import { useRecoilState, useRecoilValue } from 'recoil';
import { communityState } from '../atoms/communitiesAtom';
import {
  defaultMenuItem,
  directoryMenuState,
} from '../atoms/directoryMenuAtom';
import { CommunityState } from '../types/communities.types';
import { DirectoryMenuItem } from '../types/directory.types';

const useDirectory = () => {
  const [directoryState, setDirectoryState] =
    useRecoilState(directoryMenuState);
  const router = useRouter();

  const communityStateValue: CommunityState = useRecoilValue(communityState);

  const onSelectMenuItem = (menuItem: DirectoryMenuItem) => {
    setDirectoryState((prev) => ({
      ...prev,
      selectedMenuItem: menuItem,
    }));

    router?.push(menuItem.link);
    if (directoryState.isOpen) {
      toggleMenuOpen();
    }
  };

  const toggleMenuOpen = () => {
    setDirectoryState((prev) => ({
      ...prev,
      isOpen: !directoryState.isOpen,
    }));
  };

  useEffect(() => {
    const existingCommunity = communityStateValue.currentCommunity;

    if (existingCommunity.id) {
      setDirectoryState((prev) => ({
        ...prev,
        selectedMenuItem: {
          displayText: `r/${existingCommunity.id}`,
          link: `r/${existingCommunity.id}`,
          icon: FaReddit,
          iconColor: 'blue.500',
          imageURL: existingCommunity.imageURL,
        },
      }));
      return;
    }
    setDirectoryState((prev) => ({
      ...prev,
      selectedMenuItem: defaultMenuItem,
    }));
  }, [communityStateValue.currentCommunity, router.query, setDirectoryState]);

  return {
    directoryState,
    onSelectMenuItem,
    toggleMenuOpen,
  };
};

export default useDirectory;
