import { TiHome } from 'react-icons/ti';
import { atom } from 'recoil';
import { DirectoryMenuState } from '../types/directory.types';

export const defaultMenuItem = {
  displayText: 'Accueil',
  link: '/',
  icon: TiHome,
  iconColor: 'black',
};

export const defaultMenuState: DirectoryMenuState = {
  isOpen: false,
  selectedMenuItem: defaultMenuItem,
};

export const directoryMenuState = atom({
  key: 'directoryMenuState',
  default: defaultMenuState,
});
