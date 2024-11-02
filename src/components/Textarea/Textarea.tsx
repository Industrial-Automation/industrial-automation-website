import React, { useMemo } from 'react';

import { merge } from 'src/utils';
import { Label } from 'src/components/Label';

const sizeClasses = {
  sm: 'h-20 p-3 [&>textarea]:text-sm',
  lg: 'h-28 p-3 [&>textarea]:text-base'
};

const resizeClasses = {
  none: 'resize-none',
  y: 'resize-y',
  x: 'resize-x',
  both: 'resize'
};

interface TextareaType extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  readonly className?: React.HTMLAttributes<HTMLDivElement>['className'];
  readonly labelClassName?: React.HTMLAttributes<HTMLDivElement>['className'];

  readonly size?: keyof typeof sizeClasses;
  readonly resize?: keyof typeof resizeClasses;

  readonly label?: string;
  readonly required?: boolean;

  readonly disabled?: boolean;
}

export const Textarea = (props: TextareaType) => {
  const propsWithDefault = merge(
    {
      size: 'lg',
      resize: 'none',
      disabled: false
    } as Required<TextareaType>,
    props
  );

  const style = useMemo(() => {
    const wrapperClasses = [
      'flex',
      'items-center',
      'ring-1',
      'ring-subtone-gray-3',
      'rounded-lg',
      'duration-200',

      sizeClasses[propsWithDefault.size],
      propsWithDefault.className
    ];

    const textareaClasses = [
      'w-full',
      'h-full',
      'm-0',
      'p-0',
      'bg-transparent',
      'border-0',
      'outline-0',
      'text-sm',
      'font-medium',
      'focus:outline-none',

      resizeClasses[propsWithDefault.resize]
    ];

    if (!propsWithDefault.disabled) {
      wrapperClasses.push('[&>textarea]:placeholder:text-neutral-grey-700');
    } else {
      wrapperClasses.push(
        ...[
          'bg-neutral-grey-200',
          'text-text-disabled',
          '[&>textarea]:placeholder:text-text-disabled'
        ]
      );
    }

    return {
      wrapper: wrapperClasses.filter(Boolean).join(' '),
      textarea: textareaClasses.join(' ')
    };
  }, [propsWithDefault]);

  return (
    <div className='flex flex-col'>
      <Label
        className={['mb-2', propsWithDefault.labelClassName].join(' ')}
        text={propsWithDefault.label}
        variant={propsWithDefault.size === 'sm' ? 'sm_medium' : 'base_medium'}
        disabled={propsWithDefault.disabled}
        required={propsWithDefault.required}
      />

      <div className={style.wrapper}>
        <textarea
          className={style.textarea}
          name={propsWithDefault.name}
          placeholder={propsWithDefault.placeholder}
          value={propsWithDefault.value || ''}
          disabled={propsWithDefault.disabled}
          onFocus={propsWithDefault.onFocus}
          onBlur={propsWithDefault.onBlur}
          onChange={propsWithDefault.onChange}
          onInput={propsWithDefault.onInput}
          readOnly={propsWithDefault.readOnly}
          maxLength={propsWithDefault.maxLength}
        />
      </div>
    </div>
  );
};
