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

const Button: React.FC<BaseButtonProps> = (props) => {
  const {
    type = ButtonType.Default,
    size,
    disabled = false,
    href,
    children,
  } = props;

  const cls = classNames('btn', {
    [`btn-${type}`]: type,
    [`btn-${size}`]: size,
    disabled,
  });

  if (type === ButtonType.Link) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }

  return (
    <button className={cls} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
