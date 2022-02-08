import classNames from 'classnames';

export type ButtonType = 'primary' | 'danger' | 'default' | 'link';

export type ButtonSize = 'lg' | 'sm';

interface BaseButtonProps {
  /** 类型 */
  type?: ButtonType;
  /** 尺寸大小 */
  size?: ButtonSize;
  /** link 类型的 href */
  href?: string;
  /** 是否禁用 */
  disabled?: boolean;
}

export type ButtonProps = BaseButtonProps &
  (
    | React.ButtonHTMLAttributes<HTMLElement>
    | React.AnchorHTMLAttributes<HTMLElement>
  );

/**
 * ## 何时使用
 * 标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。
 */
export const Button: React.FC<ButtonProps> = (props) => {
  const {
    type,
    size,
    disabled = false,
    href,
    children,
    className,
    ...restProps
  } = props;

  const cls = classNames('qi-btn', className, {
    [`qi-btn-${type}`]: type,
    [`qi-btn-${size}`]: size,
    disabled,
  });

  if (type === 'link' && href) {
    return (
      <a {...restProps} href={href} className={cls}>
        {children}
      </a>
    );
  }

  return (
    <button {...restProps} className={cls} disabled={disabled}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: 'default',
};
