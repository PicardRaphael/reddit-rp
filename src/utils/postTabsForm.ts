import { IoDocumentText, IoImageOutline } from 'react-icons/io5';
import { TabItem } from '../types/post.types';

export const postTabsForm: TabItem[] = [
  {
    title: 'Publication',
    icon: IoDocumentText,
    key: 'post',
  },
  {
    title: 'Images & Vidéo',
    icon: IoImageOutline,
    key: 'image',
  },
];
