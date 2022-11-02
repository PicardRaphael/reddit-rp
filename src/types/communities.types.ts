import { Timestamp } from 'firebase/firestore';

export type CommunityPrivacy = 'public' | 'restrictied' | 'private';
export interface Community {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: CommunityPrivacy;
  createdAt?: Timestamp;
  imageURL?: string;
}

export interface CommunitySnippet {
  communityId: string;
  isModerator?: boolean;
  imageURL?: string;
}

export interface CommunityState {
  [key: string]:
    | CommunitySnippet[]
    | { [key: string]: Community }
    | Community
    | boolean
    | undefined;
  mySnippets: CommunitySnippet[];
  initSnippetsFetched: boolean;
  visitedCommunities: {
    [key: string]: Community;
  };
  currentCommunity: Community;
}
