import { atom } from 'recoil';

export interface CommunityModalState {
  open: boolean;
}
const communityModal: CommunityModalState = {
  open: false,
};

export const communityModalState = atom<CommunityModalState>({
  key: 'communityModalState',
  default: communityModal,
});
