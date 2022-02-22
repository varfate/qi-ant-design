import axios from 'axios';
import classNames from 'classnames';
import { ChangeEvent, FC, HTMLAttributes, useRef, useState } from 'react';
import { Button, ButtonProps } from '../button';
import { UploadDragger } from './upload-dragger';
import { UploadList } from './upload-list';

export type UploadFileStatus =
  | 'ready'
  | 'success'
  | 'error'
  | 'canceled'
  | 'uploading';

export interface UploadFile {
  /** ID */
  uid: string;
  /** 上传状态 */
  status: UploadFileStatus;
  /** 原始文件对象 */
  raw: File;
  /** 文件名称 */
  name: string;
  /** 进度百分比 */
  percent: number;
  /** 文件类型 */
  fileType: string;
  /** 错误信息 */
  error?: any;
}

export interface UploadProps
  extends Omit<HTMLAttributes<HTMLElement>, 'onError' | 'onProgress'> {
  /** 请求地址 */
  action: string;
  /** 上传成功的回调 */
  onSuccess?: (res: any, files: UploadFile) => void;
  /** 上传失败的回调 */
  onError?: (err: Error, file: UploadFile) => void;
  /** 上传中的回调 */
  onProgress?: (percentage: number, file: UploadFile) => void;
  /** 删除文件回调 */
  onRemove?: (file: UploadFile) => void;
  /** 上传之前, 返回 `Promise`, false 则不会上传 */
  beforeUpload?: (
    file: UploadFile[],
  ) => Promise<UploadFile | boolean | undefined>;
  /** 上传之后, 无论成功或者失败都谁触发 */
  afterUpload?: (file: UploadFile[]) => void;
  /** 多文件 */
  multipart?: boolean;
  /** 限制上传的文件类型 */
  accept?: string;
  /** 拖拽样式 */
  drag?: boolean;
}

export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    onProgress,
    onSuccess,
    onError,
    beforeUpload,
    afterUpload,
    className,
    multipart,
    accept,
    onRemove,
    drag,
    children,
    ...restProps
  } = props;
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const updateFileList = (file: UploadFile, fileObj: Partial<UploadFile>) => {
    setFileList((prevList) =>
      prevList.map((prevFile) => {
        if (prevFile.uid === file.uid) {
          return {
            ...file,
            ...fileObj,
          };
        }
        return prevFile;
      }),
    );
  };

  const handleClick: ButtonProps['onClick'] = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!fileRef.current) return;
    fileRef.current.value = '';
    fileRef.current.click();
  };

  const onFile = async (files: FileList) => {
    let toUploadFiles: UploadFile[] = Array.from(files).map((file, index) => {
      return {
        uid: generateUid(file.name, index),
        name: file.name,
        status: 'ready',
        raw: file,
        fileType: file.type,
        percent: 0,
      };
    });
    if (beforeUpload) {
      const beforeUploadResult = await beforeUpload(toUploadFiles);
      if (beforeUploadResult === false) {
        return;
      } else if (Array.isArray(beforeUploadResult)) {
        toUploadFiles = beforeUploadResult;
      }
    }
    setFileList((prevList) => [...toUploadFiles, ...prevList]);
    await uploadFiles(toUploadFiles);
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!fileRef.current) return;
    const { files } = e.target;
    if (!files) return;
    onFile(files);
  };

  const generateUid = (name: string, index?: number) => {
    return `${Date.now()}-${name}-${index || 0}`;
  };

  const upload = async (file: UploadFile, index: number) => {
    try {
      const formData = new FormData();
      formData.append(file.name, file.raw);
      const res = await axios({
        url: action,
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (e) => {
          const percentage = Math.floor((e.loaded * 100) / e.total);
          updateFileList(file, {
            status: 'uploading',
            percent: percentage,
          });
          onProgress?.(percentage, file);
        },
      });
      updateFileList(file, {
        status: 'success',
      });
      onSuccess?.(res, file);
      return res;
    } catch (err) {
      updateFileList(file, {
        status: 'error',
      });
      onError?.(err as Error, file);
    }
  };

  const uploadFiles = async (files: UploadFile[]) => {
    await Promise.all(files.map(upload));
    afterUpload?.(files);
  };

  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) =>
      prevList.filter((prevFile) => prevFile.uid !== file.uid),
    );
    if (onRemove) {
      onRemove(file);
    }
  };

  const cls = classNames('qi-upload', className);

  return (
    <div {...restProps} className={cls}>
      <div onClick={handleClick}>
        {drag ? (
          <UploadDragger onFile={onFile}>{children}</UploadDragger>
        ) : (
          <Button type="primary" icon="file-image">
            {children}
          </Button>
        )}
      </div>
      <input
        ref={fileRef}
        type="file"
        onChange={handleFileChange}
        style={{
          display: 'none',
        }}
        multiple={multipart}
        accept={accept}
      />
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  );
};
