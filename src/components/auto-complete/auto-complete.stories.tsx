import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AutoComplete } from './auto-complete';

export default {
  title: 'AutoComplete 自动填充',
  component: AutoComplete,
} as ComponentMeta<typeof AutoComplete>;

export const Basic: ComponentStory<typeof AutoComplete> = () => {
  const fetchOptions = async (query: string) => {
    const res = await fetch(`https://api.github.com/search/users?q=${query}`);
    const result: { items: { login: string }[] } = await res.json();

    return result.items.map((item) => ({
      ...item,
      value: item.login,
    }));
  };

  return <AutoComplete fetchOptions={fetchOptions} />;
};

Basic.storyName = '基础用法';
