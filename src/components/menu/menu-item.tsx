import classNames from 'classnames';
import { useCallback, useContext } from 'react';
import MenuContext from './menu-context';

export interface MenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
  key?: string;
  eventKey?: string;
  disabled?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { eventKey = '', className, disabled = false, children } = props;
  const { activeKey, onSelect } = useContext(MenuContext);

  const cls = classNames('qi-menu-item', className, {
    disabled,
    active: activeKey === eventKey,
  });

  const handleClick = useCallback(() => {
    if (disabled) return;
    onSelect?.(eventKey);
  }, [disabled, eventKey, onSelect]);

  return (
    <li className={cls} onClick={handleClick}>
      {children}
    </li>
  );
};

export default MenuItem;
