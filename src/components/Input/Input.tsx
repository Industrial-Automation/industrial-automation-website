import React, { useMemo } from 'react';

import { merge } from 'src/utils';

import { Label } from '../Label';
import { Icons, IconsType } from '../Icons';

const sizeClasses = {
  sm: 'gap-2 h-8 p-2 [&>input]:text-sm',
  lg: 'gap-3 h-11 p-3 [&>input]:text-base'
};

const statusClasses = {
  error: '',
  success: ''
};

interface InputType extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  readonly className?: React.HTMLAttributes<HTMLDivElement>['className'];
  readonly labelClassName?: React.HTMLAttributes<HTMLDivElement>['className'];

  readonly type?: 'text' | 'number' | 'password' | 'email' | 'tel' | 'radio' | 'datetime-local';

  readonly icon?: IconsType['variant'];

  readonly label?: string;
  readonly required?: boolean;

  readonly size?: keyof typeof sizeClasses;

  readonly step?: number;

  readonly leftBar?: () => React.JSX.Element;
  readonly rightBar?: () => React.JSX.Element;

  readonly status?: keyof typeof statusClasses;
  readonly errorMessage?: string;

  readonly disabled?: boolean;
}

export const Input = (props: InputType) => {
  const propsWithDefault = merge(
    {
      type: 'text',
      size: 'lg',
      disabled: false
    } as Required<InputType>,
    props
  );

  const style = useMemo(() => {
    const elementClasses = [
      'flex',
      'items-center',
      'ring-1',
      'ring-subtone-gray-3',
      'rounded-lg',
      'duration-200'
    ];

    if (!propsWithDefault.disabled) {
      elementClasses.push(
        ...['[&>input]:placeholder:text-neutral-grey-700', 'hover:ring-neutral-grey-700']
      );
    } else {
      elementClasses.push(
        ...['bg-neutral-grey-200', 'text-text-disabled', '[&>input]:placeholder:text-text-disabled']
      );
    }

    if (propsWithDefault.size) {
      elementClasses.push(sizeClasses[propsWithDefault.size]);
    }

    if (propsWithDefault.status) {
      elementClasses.push(statusClasses[propsWithDefault.status]);
    }

    if (propsWithDefault.className) {
      elementClasses.push(propsWithDefault.className);
    }

    return elementClasses.filter(Boolean).join(' ');
  }, [
    propsWithDefault.className,
    propsWithDefault.disabled,
    propsWithDefault.size,
    propsWithDefault.status
  ]);

  return (
    <div className='flex flex-col'>
      <Label
        className={['mb-2', propsWithDefault.labelClassName].join(' ')}
        text={propsWithDefault.label}
        variant={propsWithDefault.size === 'sm' ? 'sm_medium' : 'base_medium'}
        disabled={propsWithDefault.disabled}
        required={propsWithDefault.required}
      />

      <div className={style}>
        {propsWithDefault.leftBar && propsWithDefault.leftBar()}

        {propsWithDefault.icon && (
          <Icons
            variant={propsWithDefault.icon}
            size={propsWithDefault.size === 'sm' ? 'md' : 'lg'}
            color={propsWithDefault.disabled ? 'gray' : 'skyblue'}
          />
        )}

        <input
          className={[
            'w-full',
            'grow',
            'm-0',
            'p-0',
            'bg-transparent',
            'border-0',
            'outline-0',
            'text-sm',
            'font-medium',
            'focus:outline-none'
          ].join(' ')}
          type={propsWithDefault.type}
          name={propsWithDefault.name}
          placeholder={propsWithDefault.placeholder}
          value={propsWithDefault.value || ''}
          disabled={propsWithDefault.disabled}
          autoComplete={propsWithDefault.autoComplete}
          onFocus={propsWithDefault.onFocus}
          onBlur={propsWithDefault.onBlur}
          onChange={propsWithDefault.onChange}
          onInput={propsWithDefault.onInput}
          readOnly={propsWithDefault.readOnly}
          maxLength={propsWithDefault.maxLength}
          step={propsWithDefault.step}
        />

        {propsWithDefault.rightBar && propsWithDefault.rightBar()}
      </div>
    </div>
  );
};
