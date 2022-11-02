import { Icon } from '@chakra-ui/react';
import { Timestamp } from 'firebase/firestore';

export type TabItem = {
  title: string;
  icon: typeof Icon.arguments;
  key: string;
};
export type PostForm = {
  title: string;
  body: string;
  image?: string;
};

export type Post = {
  id: string;
  communityId: string;
  communityImageURL?: string;
  userDisplayText: string;
  creatorId: string;
  title: string;
  body: string;
  numberOfComments: number;
  voteStatus: number;
  currentUserVoteStatus?: {
    id: string;
    voteValue: number;
  };
  imageURL?: string;
  postIdx?: number;
  createdAt?: Timestamp;
  editedAt?: Timestamp;
};

export type PostVote = {
  id?: string;
  postId: string;
  communityId: string;
  voteValue: number;
};

export interface PostState {
  selectedPost: Post | null;
  posts: Post[];
  postVotes: PostVote[];
  postsCache: {
    [key: string]: Post[];
  };
  postUpdateRequired: boolean;
}
