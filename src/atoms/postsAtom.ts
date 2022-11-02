import { atom } from 'recoil';
import { PostState } from '../types/post.types';

export const defaultPostState: PostState = {
  selectedPost: null,
  posts: [],
  postVotes: [],
  postsCache: {},
  postUpdateRequired: true,
};

export const postsState = atom<PostState>({
  key: 'postState',
  default: defaultPostState,
});
