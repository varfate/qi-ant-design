import classNames from 'classnames';
import React from 'react';
import { useState } from 'react';
import MenuContext, { MenuContextProps, SelectCallback } from './menu-context';
import { MenuItemProps } from './menu-item';

export type MenuMode = 'horizontal' | 'vertical';

export interface MenuProps
  extends Omit<React.HTMLAttributes<HTMLUListElement>, 'onSelect'> {
  defaultKey?: string;
  mode?: MenuMode;
  onSelect?: SelectCallback;
}

const Menu: React.FC<MenuProps> = (props) => {
  const {
    className,
    defaultKey = '',
    mode = 'horizontal',
    children,
    onSelect,
    ...restProps
  } = props;

  const [activeKey, setActiveKey] = useState(defaultKey);

  const handleClick = (key: string) => {
    setActiveKey(key);
    onSelect?.(key);
  };

  const passedContext: MenuContextProps = {
    activeKey,
    onSelect: handleClick,
    mode,
  };

  const cls = classNames('qi-menu', className, `qi-menu-${mode}`);

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) return null;
      const childElement =
        child as React.FunctionComponentElement<MenuItemProps>;
      const { name } = childElement.type;
      if (!['MenuItem', 'SubMenu'].includes(name)) {
        console.error(
          'Warning: SubMenu has a child witch is not MenuItem component',
        );
        return null;
      }
      const { key } = childElement;
      const eventKey = String(key != null ? key : index);
      const clonedProps = {
        key: eventKey,
        eventKey,
      };
      return React.cloneElement(child, clonedProps);
    });
  };

  return (
    <ul {...restProps} className={cls} data-testid="menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

export default Menu;
