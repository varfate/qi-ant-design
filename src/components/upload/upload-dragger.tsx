import classNames from 'classnames';
import { DragEventHandler, FC, useState, DragEvent } from 'react';

interface UploadDraggerProps {
  className?: string;
  onFile: (files: FileList) => void;
}

export const UploadDragger: FC<UploadDraggerProps> = (props) => {
  const { className, onFile, children } = props;
  const [isDragOvered, setIsDragOvered] = useState(false);

  const cls = classNames('qi-upload-drag', className, {
    'qi-upload-drag-active': isDragOvered,
  });

  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault();
    setIsDragOvered(over);
  };

  const handleDrop: DragEventHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsDragOvered(false);
    onFile(e.dataTransfer.files);
  };

  return (
    <div
      className={cls}
      onDragOver={(e) => handleDrag(e, true)}
      onDragLeave={(e) => handleDrag(e, false)}
      onDrop={handleDrop}
    >
      {children || '点击或拖拽'}
    </div>
  );
};
