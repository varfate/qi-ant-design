import { render, screen } from '@testing-library/react';
import { ButtonType } from './button';
import { Button } from './index';

describe('测试 Button 组件', () => {
  test('应该渲染出正确的默认按钮', () => {
    const text = "I'm a button";
    render(<Button>{text}</Button>);
    const btn = screen.getByText(text);

    expect(btn).toBeInTheDocument();
    expect(btn.tagName).toBe('BUTTON');
    expect(btn).toHaveClass('btn', 'btn-default');
  });
  test('根据不同的 props, 应该渲染出正确的按钮', () => {
    const primaryText = "I'm a primary button";
    render(<Button type={ButtonType.Primary}>{primaryText}</Button>);
    const primaryBtn = screen.getByText(primaryText);
    const dangerText = "I'm a danger button";
    render(<Button type={ButtonType.Danger}>{dangerText}</Button>);
    const dangerBtn = screen.getByText(dangerText);

    expect(primaryBtn).toHaveClass('btn', 'btn-primary');
    expect(dangerBtn).toHaveClass('btn', 'btn-danger');
  });
  test('如果按钮类型为 Link 且传递了 href, 应该渲染为链接', () => {
    const text = "I'm a link";
    const href = 'http://www.sogou.com/';
    render(
      <Button type={ButtonType.Link} href={href}>
        {text}
      </Button>,
    );
    const btn = screen.getByText(text);

    expect(btn).toHaveClass('btn', 'btn-link');
    expect(btn.tagName).toBe('A');
    expect(btn.getAttribute('href')).toBe(href);
  });
  test('如果按钮类型为 Link 但是没有传递 href, 应该渲染为按钮', () => {
    const text = "I'm a link button";
    render(<Button type={ButtonType.Link}>{text}</Button>);
    const btn = screen.getByText(text);

    expect(btn).toHaveClass('btn-link');
    expect(btn.tagName).toBe('BUTTON');
  });
  test('如果禁用, 应渲染为禁用状态', () => {
    const text = "I'm a disabled button";
    render(<Button disabled>{text}</Button>);
    const btn = screen.getByText(text);

    expect(btn).toHaveClass('disabled');
    expect(btn).toBeDisabled();
  });
});
