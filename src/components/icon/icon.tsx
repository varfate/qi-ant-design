/**
 * 图标
 */

import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

export type IconType = 'default' | 'primary' | 'danger';

export interface IconProps extends FontAwesomeIconProps {
  type?: IconType;
}

export const Icon = (props: IconProps) => {
  const { className, type = 'default', ...restProps } = props;
  const cls = classNames('qi-icon', className, `qi-icon-${type}`);

  return <FontAwesomeIcon {...restProps} className={cls} />;
};
