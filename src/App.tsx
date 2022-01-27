import { Button, ButtonType, ButtonSize } from './components/button';
import { Icon } from './components/icon';
import { Menu, MenuItem, SubMenu } from './components/menu';

const App = () => {
  return (
    <div className="app">
      <Icon icon='coffee' size="lg" type='primary' />
      <hr />
      <Menu>
        <SubMenu title="SubMenu-1">
          <MenuItem key="1-1">item 1-1</MenuItem>
          <MenuItem key="1-2">item 1-2</MenuItem>
          <MenuItem key="1-3" disabled>
            item 1-3
          </MenuItem>
        </SubMenu>
        <SubMenu title="SubMenu-2">
          <MenuItem key="2-1">item 2-1</MenuItem>
          <MenuItem key="2-2">item 2-2</MenuItem>
          <MenuItem key="2-3" disabled>
            item 2-3
          </MenuItem>
        </SubMenu>
      </Menu>
      <Menu mode="vertical">
        <SubMenu title="SubMenu-1">
          <MenuItem key="1-1">item 1-1</MenuItem>
          <MenuItem key="1-2">item 1-2</MenuItem>
          <MenuItem key="1-3" disabled>
            item 1-3
          </MenuItem>
        </SubMenu>
        <SubMenu title="SubMenu-2">
          <MenuItem key="2-1">item 2-1</MenuItem>
          <MenuItem key="2-2">item 2-2</MenuItem>
          <MenuItem key="2-3" disabled>
            item 2-3
          </MenuItem>
        </SubMenu>
      </Menu>
      <hr />
      <Button>button</Button>
      <Button onClick={(e) => alert(e.target)} disabled>
        button
      </Button>
      <Button type={ButtonType.Primary}>button primary</Button>
      <Button type={ButtonType.Danger}>button danger</Button>
      <Button type={ButtonType.Danger} size={ButtonSize.Large}>
        button large
      </Button>
      <Button type={ButtonType.Danger} size={ButtonSize.Small}>
        button small
      </Button>
      <Button type={ButtonType.Danger} size={ButtonSize.Large} disabled>
        button
      </Button>
      <Button type={ButtonType.Link} size={ButtonSize.Large}>
        button link
      </Button>
      <Button
        type={ButtonType.Link}
        size={ButtonSize.Large}
        target="_blank"
        disabled
        href="https://www.sogou.com/"
      >
        button link disabled
      </Button>
    </div>
  );
};

export default App;
