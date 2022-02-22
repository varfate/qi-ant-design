import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FC, ReactElement } from 'react';
import { Icon, IconProps } from '../icon';
import { UploadFile } from './upload';

interface UploadListProps {
  fileList: UploadFile[];
  onRemove: (file: UploadFile) => void;
}

export const UploadList: FC<UploadListProps> = (props) => {
  const { fileList, onRemove } = props;
  const translateIcon = (fileType: string) => {
    const typeDic: Record<string, string> = {
      text: 'lines',
      audio: 'audio',
      image: 'image',
      video: 'video',
    };
    let icon = typeDic[fileType];
    icon = icon ? `file-${icon}` : 'file';
    return icon as IconProp;
  };

  const renderFileIcon = (file: UploadFile) => {
    const type = file.raw.type.split('/')[0];
    const icon = translateIcon(type);
    return <Icon icon={icon} className="qi-upload-list-file-icon" />;
  };

  const renderStatusIcon = (status: UploadFile['status']) => {
    const statusIcons: Partial<
      Record<UploadFile['status'], ReactElement<IconProps>>
    > = {
      uploading: (
        <Icon icon="snowflake" spin className="qi-upload-list-status-loading" />
      ),
      success: (
        <Icon icon="circle-check" className="qi-upload-list-status-success" />
      ),
      error: (
        <Icon icon="circle-xmark" className="qi-upload-list-status-error" />
      ),
    };
    return statusIcons[status] || null;
  };

  return (
    <ul className="qi-upload-list">
      {fileList.map((file) => {
        return (
          <li key={file.uid} className="qi-upload-list-item">
            <div className="qi-upload-list-info">
              {renderFileIcon(file)}
              <span className="qi-upload-list-text">{file.name}</span>
              {renderStatusIcon(file.status)}
              <Icon
                icon="trash-can"
                className="qi-upload-list-status-remove"
                onClick={() => onRemove(file)}
              />
            </div>

            {file.status === 'uploading' && (
              <div className="qi-upload-list-progress">
                <div
                  className="qi-upload-list-progress-inner"
                  style={{
                    width: `${file.percent}%`,
                  }}
                >
                  {file.percent}%
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};
