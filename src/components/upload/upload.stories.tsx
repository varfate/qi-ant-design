import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Upload } from './upload';

export default {
  title: 'Upload 文件上传',
  component: Upload,
} as ComponentMeta<typeof Upload>;

const checkFileSize = (file: File) => {
  return Math.round(file.size / 1024 ** 3) < 10;
};

const Template: ComponentStory<typeof Upload> = (args) => <Upload {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  action: 'https://jsonplaceholder.typicode.com/posts',
  children: '上传',
  multipart: true,
  beforeUpload: async (files) => {
    for (let file of files) {
      if (!checkFileSize(file.raw)) {
        alert('大了');
        return false;
      }
    }
  },
};
Basic.storyName = 'Upload 文件上传';
