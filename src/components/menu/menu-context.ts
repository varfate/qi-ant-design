import { createContext } from 'react';
import { MenuMode } from './menu';

export type MenuTheme = 'light' | 'dark';
export type SelectCallback = (selectedKey: string) => void;

export interface MenuContextProps {
  activeKey?: string;
  onSelect?: SelectCallback;
  mode: MenuMode;
}

const MenuContext = createContext<MenuContextProps>({
  activeKey: '',
  mode: 'horizontal',
});

export default MenuContext;
