import classNames from 'classnames';

export enum ButtonType {
  Primary = 'primary',
  Danger = 'danger',
  Default = 'default',
  Link = 'link',
}

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm',
}

interface BaseButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
  href?: string;
  disabled?: boolean;
}

type ButtonProps = BaseButtonProps &
  (
    | React.ButtonHTMLAttributes<HTMLElement>
    | React.AnchorHTMLAttributes<HTMLElement>
  );

const Button: React.FC<ButtonProps> = (props) => {
  const {
    type = ButtonType.Default,
    size,
    disabled = false,
    href,
    children,
    className,
    ...restProps
  } = props;

  const cls = classNames('btn', className, {
    [`btn-${type}`]: type,
    [`btn-${size}`]: size,
    disabled,
  });

  if (type === ButtonType.Link && href) {
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

export default Button;
