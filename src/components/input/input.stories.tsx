import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Input } from '.';
import { Icon } from '../icon';

const TITLE = 'Input 输入框';

export default {
  title: TITLE,
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  placeholder: 'Basic usage',
};
Basic.storyName = TITLE;

export const AffixInput: ComponentStory<typeof Input> = () => {
  return (
    <>
      <Input prefix={<Icon icon="user" />} placeholder="前缀" />
      <br />
      <br />
      <Input suffix={<Icon icon="angle-down" />} placeholder="后缀" />
      <br />
      <br />
      <Input
        prefix={<Icon icon="user" />}
        suffix={<Icon icon="angle-down" />}
        placeholder="前后缀"
      />
    </>
  );
};
AffixInput.storyName = '前后缀';

export const SizesInput: ComponentStory<typeof Input> = () => {
  return (
    <>
      <Input size="lg" placeholder="大" />
      <br />
      <br />
      <Input placeholder="默认" />
      <br />
      <br />
      <Input size="sm" placeholder="小" />
    </>
  );
};
SizesInput.storyName = '不同尺寸';

export const DisabledInput: ComponentStory<typeof Input> = () => {
  return (
    <>
      <Input disabled prefix={<Icon icon="user" />} placeholder="前缀" />
      <br />
      <br />
      <Input disabled suffix={<Icon icon="angle-down" />} placeholder="后缀" />
      <br />
      <br />
      <Input
        disabled
        prefix={<Icon icon="user" />}
        suffix={<Icon icon="angle-down" />}
        placeholder="前后缀"
      />
    </>
  );
};
DisabledInput.storyName = '禁用';
