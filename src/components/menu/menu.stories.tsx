import { ComponentMeta, ComponentStory } from '@storybook/react';
import Menu from './menu';
import MenuItem from './menu-item';
import SubMenu from './sub-menu';

export default {
  title: 'Menu 菜单',
  component: Menu,
} as ComponentMeta<typeof Menu>;

export const Basic: ComponentStory<typeof Menu> = () => {
  return (
    <Menu>
      <SubMenu key="a" title="aaa">
        <MenuItem>a-1</MenuItem>
        <MenuItem>a-2</MenuItem>
        <MenuItem>a-3</MenuItem>
      </SubMenu>
      <SubMenu key="b" title="bbb">
        <MenuItem>b-1</MenuItem>
        <MenuItem>b-2</MenuItem>
        <MenuItem>b-3</MenuItem>
      </SubMenu>
    </Menu>
  );
};
Basic.storyName = '基本用法';
