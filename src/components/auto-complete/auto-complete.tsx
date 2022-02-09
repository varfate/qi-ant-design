import classNames from 'classnames';
import { useEffect, useState, FC, ReactElement, useRef } from 'react';
import useClickOutside from '../../hooks/use-click-outside';
import useDebounce from '../../hooks/use-debounce';
import { Icon } from '../icon';
import { Input, InputProps } from '../input';

export type AutoCompleteOption<T = {}> = T & {
  value: string;
};

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  onSelect?: (option: AutoCompleteOption) => void;
  fetchOptions: (
    query: string,
  ) => AutoCompleteOption[] | Promise<AutoCompleteOption[]>;
  renderOption?: (option: AutoCompleteOption) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    onChange,
    onSelect,
    className,
    fetchOptions,
    renderOption,
    ...restProps
  } = props;
  const [value, setValue] = useState('');
  const [options, setOptions] = useState<AutoCompleteOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState<number>(-1);
  const triggerSearchRef = useRef(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const cls = classNames('qi-auto-complete', className, {});
  const debouncedValue = useDebounce(value, 500);
  useClickOutside(componentRef, () => {
    setOptions([]);
  });

  useEffect(() => {
    if (!options.length) setHighlightIndex(-1);
  }, [options.length]);

  useEffect(() => {
    (async () => {
      if (!debouncedValue) {
        setOptions([]);
        return;
      }
      if (!triggerSearchRef.current) return;
      setLoading(true);
      const result = await fetchOptions(debouncedValue);
      setOptions(result);
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const handleChange: AutoCompleteProps['onChange'] = async (e) => {
    triggerSearchRef.current = true;
    setValue(e.target.value);
    onChange?.(e);
  };

  const handleSelect = (option: AutoCompleteOption) => {
    triggerSearchRef.current = false;
    setValue(option.value);
    setOptions([]);
    onSelect?.(option);
  };

  const handleKeydown: InputProps['onKeyDown'] = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        setHighlightIndex((pre) => {
          const max = options.length - 1;
          return Math.min(pre + 1, max);
        });
        return;
      case 'ArrowUp':
        setHighlightIndex((pre) => {
          return Math.max(-1, pre - 1);
        });
        return;
      case 'Escape':
        setOptions([]);
        return;
      case 'Enter':
        if (highlightIndex !== -1) {
          handleSelect(options[highlightIndex]);
        }
    }
  };

  const renderDropdown = () => {
    if (!options.length) return null;
    return (
      <ul className="qi-auto-complete-dropdown">
        {loading ? (
          <li className="qi-auto-complete-dropdown-loading">
            <Icon icon="spinner" spin />
          </li>
        ) : (
          options.map((option, index) => {
            return (
              <li
                onClick={() => handleSelect(option)}
                key={option.value}
                className={classNames({
                  highlighted: highlightIndex === index,
                })}
              >
                {renderOption ? renderOption(option) : option.value}
              </li>
            );
          })
        )}
      </ul>
    );
  };

  return (
    <div className={cls} ref={componentRef}>
      <Input
        {...restProps}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeydown}
      />
      {renderDropdown()}
    </div>
  );
};
