import { fireEvent, render, screen } from '@testing-library/react';
import { Input, InputProps } from './input';

describe('test Input component', () => {
  const placeholder = 'input';
  const defaultProps: InputProps = {
    onChange: jest.fn(),
    placeholder,
  };
  it('should render input', () => {
    render(<Input {...defaultProps} />);
    const inputElement = screen.getByPlaceholderText(
      placeholder,
    ) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: '123' } });

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass('qi-input');
    expect(defaultProps.onChange).toHaveBeenCalled();
    expect(inputElement.value).toEqual('123');
  });

  it('disabled input', () => {
    render(<Input {...defaultProps} disabled />);
    const inputElement = screen.getByPlaceholderText(
      placeholder,
    ) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: '123' } });

    expect(inputElement.disabled).toBeTruthy();
    expect(defaultProps.onChange).not.toHaveBeenCalled();
  });

  it('render prefix/suffix', () => {
    render(<Input {...defaultProps} prefix="https://" suffix=".com" />);
    const prefixElement = screen.getByText('https://');
    const suffixElement = screen.getByText('.com');

    expect(prefixElement).toBeInTheDocument();
    expect(suffixElement).toBeInTheDocument();
  });
});
