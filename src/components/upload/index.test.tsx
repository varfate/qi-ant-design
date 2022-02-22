import { render, screen } from '@testing-library/react';
import { Upload, UploadProps } from './upload';

describe('Upload component', () => {
  const defaultProps: UploadProps = {
    action: 'https://jsonplaceholder.typicode.com/posts',
    beforeUpload: jest.fn(),
    afterUpload: jest.fn(),
    onSuccess: jest.fn(),
    onError: jest.fn(),
    onRemove: jest.fn(),
    onProgress: jest.fn(),
    className: 'test-upload',
    children: 'test upload',
    drag: true,
  };

  it('render fine', () => {
    render(<Upload {...defaultProps} />);
    const uploader = screen.getByText('test upload');
    expect(uploader).toBeInTheDocument()
  });
});
