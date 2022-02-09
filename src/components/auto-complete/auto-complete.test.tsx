import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AutoComplete, AutoCompleteProps } from './auto-complete';

describe('AutoComplete Component', () => {
  const options = [
    {
      value: 'a',
      label: 1,
    },
    {
      value: 'ab',
      label: 2,
    },
    {
      value: 'abc',
      label: 3,
    },
  ];

  const placeholder = 'auto-complete';

  const defaultProps: AutoCompleteProps = {
    onSelect: jest.fn(),
    fetchOptions: (query) =>
      options.filter((item) => item.value.includes(query)),
    placeholder,
  };

  it('should render correct', async () => {
    render(<AutoComplete {...defaultProps} />);
    const input = screen.getByPlaceholderText(placeholder);

    fireEvent.change(input, { target: { value: 'a' } });
    await waitFor(() => {
      expect(screen.getByText('ab')).toBeInTheDocument();
    });
  });
});
