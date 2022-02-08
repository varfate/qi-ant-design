/**
 * 输入框
 */

import classNames from 'classnames';
import React, { useState } from 'react';

export type InputSize = 'lg' | 'sm';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  /** 是否禁用 */
  disabled?: boolean;
  /** 大小 */
  size?: InputSize;
  /** 前缀 */
  prefix?: React.ReactNode;
  /** 后缀 */
  suffix?: React.ReactNode;
}

/**
 * ## 输入框
 *
 * 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 *
 * ```js
 * import { Input } from 'qi-antd';
 * ```
 */
export const Input: React.FC<InputProps> = (props) => {
  const {
    disabled,
    className,
    size,
    prefix,
    suffix,
    children,
    onFocus,
    onBlur,
    onChange,
    ...restProps
  } = props;
  const [focused, setFocused] = useState(false);
  const cls = classNames('qi-input-wrapper', className, {
    disabled,
    [`qi-input-wrapper-${size}`]: size,
    'qi-input-wrapper-focused': focused,
  });

  const handleFocus: InputProps['onFocus'] = (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur: InputProps['onBlur'] = (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    setFocused(false);
    onBlur?.(e);
  };

  const handleChange: InputProps['onChange'] = (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onChange?.(e);
  };

  return (
    <span className={cls} data-testid="input">
      {!!prefix && <span className="qi-input-prefix">{prefix}</span>}
      <input
        {...restProps}
        disabled={disabled}
        className="qi-input"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      {!!suffix && <span className="qi-input-suffix">{suffix}</span>}
    </span>
  );
};
