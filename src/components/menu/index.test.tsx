import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import MenuItem from './menu-item';
import Menu, { MenuProps } from './menu';
import SubMenu from './sub-menu';

const testMenuProps: MenuProps = {
  mode: 'horizontal',
  defaultKey: '1',
  onSelect: jest.fn(),
  className: 'test',
};

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem key="1">active</MenuItem>
      <MenuItem key="2" disabled>
        disabled
      </MenuItem>
      <MenuItem key="3">default</MenuItem>
      <SubMenu title="sub-1">
        <MenuItem key="sub-1-1">sub-1-1</MenuItem>
        <MenuItem key="sub-1-2">sub-1-2</MenuItem>
      </SubMenu>
      <SubMenu title="sub-2">
        <MenuItem key="sub-2-1">sub-2-1</MenuItem>
        <MenuItem key="sub-2-2">sub-2-2</MenuItem>
      </SubMenu>
    </Menu>
  );
};

const createStyle = () => {
  const css = `
    .qi-sub-menu-body {
      display: none;
    }
    .opened .qi-sub-menu-body {
      display: block;
    }
  `;

  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  return style;
};

let menuElement: HTMLElement,
  defaultElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;

const setUp = (props: MenuProps) => {
  render(generateMenu(props));
  menuElement = screen.getByTestId('menu');
  defaultElement = screen.getByText('default');
  activeElement = screen.getByText('active');
  disabledElement = screen.getByText('disabled');
};

describe('测试 Menu 和 MenuItem 组件', () => {
  it('默认渲染正确', () => {
    setUp(testMenuProps);

    expect(menuElement).toHaveClass('qi-menu', 'test');
    expect(defaultElement).toHaveClass('qi-menu-item');
    expect(activeElement).toHaveClass('qi-menu-item', 'active');
    expect(disabledElement).toHaveClass('qi-menu-item', 'disabled');
    expect(menuElement.childNodes.length).toBe(5);
  });

  it('应该触发回调且切换 active 状态 当点击按钮的时候', () => {
    setUp(testMenuProps);
    fireEvent.click(defaultElement);

    expect(activeElement).not.toHaveClass('active');
    expect(defaultElement).toHaveClass('active');
    expect(testMenuProps.onSelect).toHaveBeenCalledWith('3');
  });

  it('do nothing if disabled', () => {
    setUp(testMenuProps);
    fireEvent.click(disabledElement);

    expect(disabledElement).not.toHaveClass('active');
    expect(testMenuProps.onSelect).not.toHaveBeenCalled();
  });

  it('渲染为 vertical, 如果 mode === vertical', () => {
    render(
      generateMenu({
        mode: 'vertical',
      }),
    );
    const menuElement = screen.getByTestId('menu');

    expect(menuElement).toHaveClass('qi-menu-vertical');
  });

  it('render SubMenu correctly', async () => {
    setUp(testMenuProps);
    menuElement.appendChild(createStyle());
    const title = screen.getByText('sub-1');
    const subMenu = screen.getByText('sub-1-1');

    expect(title).toBeInTheDocument();

    expect(subMenu).toBeInTheDocument();
    expect(subMenu).not.toBeVisible();
  });

  it('should show dropdown items when hover on SubMenu', async () => {
    setUp(testMenuProps);
    menuElement.appendChild(createStyle());
    const title = screen.getByText('sub-1');
    const subMenu = screen.getByText('sub-1-1');

    fireEvent.mouseEnter(title);

    await waitFor(() => {
      expect(subMenu).toBeVisible();
    });
  });

  it('should hide dropdown items when mouse leave on SubMenu', async () => {
    setUp(testMenuProps);
    menuElement.appendChild(createStyle());
    const title = screen.getByText('sub-1');
    const subMenu = screen.getByText('sub-1-1');

    fireEvent.mouseEnter(title);
    fireEvent.mouseLeave(title);

    await waitFor(() => {
      expect(subMenu).not.toBeVisible();
    });
  });
});
