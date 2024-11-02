import React, { useMemo } from 'react';

import { merge } from 'src/utils';

import { Icons } from '../Icons';
import { Label } from '../Label';

const variantClasses = {
  standard: 'standard',
  button: 'button',
  radioButton: 'radioButton'
};

const colorClasses = {
  white: 'bg-main-white',
  skyblue: 'bg-main-skyblue',
  midnight: 'bg-main-midnight'
};

const checkedColors = {
  skyblue: 'skyblue'
};

const checkmarkColorClasses = {
  black: 'bg-main-black',
  white: 'bg-main-white',
  skyblue: 'bg-main-skyblue'
};

const checkedClasses = {
  bg: {
    [checkedColors.skyblue]: 'bg-main-skyblue'
  },
  border: {
    [checkedColors.skyblue]: 'border-main-skyblue'
  },
  text: {
    [checkedColors.skyblue]: 'text-main-skyblue'
  },
  checked: {
    [checkedColors.skyblue]: 'checked:bg-main-skyblue'
  }
};

interface CheckboxType extends React.InputHTMLAttributes<HTMLInputElement> {
  readonly className?: React.HTMLAttributes<HTMLDivElement>['className'];

  readonly variant?: keyof typeof variantClasses;

  readonly color?: keyof typeof colorClasses;
  readonly checkedColor?: keyof typeof checkedColors;
  readonly checkmarkColor?: keyof typeof checkmarkColorClasses;

  readonly label?: string;
}

export const Checkbox = (props: CheckboxType) => {
  const propsWithDefault = merge(
    {
      variant: 'standard',
      color: 'white',
      checkedColor: 'skyblue',
      checkmarkColor: 'white'
    } as Required<CheckboxType>,
    props
  );

  const style = useMemo(() => {
    const elementClasses = [
      'flex',

      colorClasses[propsWithDefault.color],
      propsWithDefault.className
    ];

    if (propsWithDefault.variant === variantClasses.button) {
      elementClasses.push('w-8 h-8 shadow-gray cursor-pointer');
    }

    return elementClasses.filter(Boolean).join(' ');
  }, [propsWithDefault.variant, propsWithDefault.color, propsWithDefault.className]);

  const buttonStyle = useMemo(() => {
    const inputStyle = [
      'w-full',
      'h-full',
      'appearance-none',
      'cursor-pointer',
      checkedClasses.checked[propsWithDefault.checkedColor]
    ];

    const labelStyle = [
      'absolute',
      'top-1/2',
      'left-1/2',
      '-translate-x-1/2',
      '-translate-y-1/2',
      'font-lato',
      'font-light',
      'text-base',
      'cursor-pointer'
    ];

    return {
      input: inputStyle.filter(Boolean).join(' '),
      label: labelStyle.join(' ')
    };
  }, [propsWithDefault.checkedColor]);

  const radioButtonStyle = useMemo(() => {
    const radioOutStyle = [
      'absolute',
      'items-center',
      'w-4',
      'h-4',
      'border',
      'rounded-full',
      'z-[1]',
      checkedClasses.border[propsWithDefault.checkedColor]
    ];

    const radioInnerStyle = [
      'absolute',
      'top-1/2',
      'left-1/2',
      '-translate-x-1/2',
      '-translate-y-1/2',
      'w-2',
      'h-2',
      'rounded-full',
      checkedClasses.bg[propsWithDefault.checkedColor]
    ];

    const inputStyle = [
      propsWithDefault.checked ? 'w-4 h-4' : 'w-0 h-0',
      'appearance-none',
      'z-[2]',
      'cursor-pointer'
    ];

    const labelStyle = [
      'font-lato',
      'font-light',
      'text-base',
      'cursor-pointer',
      propsWithDefault.checked && checkedClasses.text[propsWithDefault.checkedColor]
    ];

    return {
      radioOut: radioOutStyle.filter(Boolean).join(' '),
      radioInner: radioInnerStyle.filter(Boolean).join(' '),
      input: inputStyle.join(' '),
      label: labelStyle.filter(Boolean).join(' ')
    };
  }, [propsWithDefault.checked, propsWithDefault.checkedColor]);

  const standardStyle = useMemo(() => {
    const inputStyle = [
      'w-4',
      'h-4',
      'appearance-none',
      'cursor-pointer',
      'border',
      'border-main-skyblue',
      'checked:bg-main-skyblue',
      'rounded',
      checkedClasses.border[propsWithDefault.checkedColor],
      checkedClasses.checked[propsWithDefault.checkedColor]
    ];

    return {
      input: inputStyle.filter(Boolean).join(' ')
    };
  }, [propsWithDefault.checkedColor]);

  return (
    <div className='flex items-center'>
      <div className={style}>
        {propsWithDefault.variant === 'button' && (
          <div className='relative w-full'>
            <input
              id={props.id}
              className={buttonStyle.input}
              name={props.name}
              type='checkbox'
              checked={props.checked}
              onChange={props.onChange}
              disabled={props.disabled}
            />

            {props.label && (
              <Label
                className={buttonStyle.label}
                variant='base_medium'
                for={props.id}
                text={props.label}
                disabled={props.disabled}
              />
            )}
          </div>
        )}

        {propsWithDefault.variant === 'radioButton' && (
          <div className='flex items-center gap-1'>
            <div className='relative flex'>
              {props.checked && (
                <div className={radioButtonStyle.radioOut}>
                  <div className={radioButtonStyle.radioInner}></div>
                </div>
              )}

              <input
                id={props.id}
                className={radioButtonStyle.input}
                name={props.name}
                type='checkbox'
                checked={props.checked}
                onChange={props.onChange}
                disabled={props.disabled}
              />
            </div>

            {props.label && (
              <Label
                className={radioButtonStyle.label}
                variant='base_medium'
                for={props.id}
                text={props.label}
                disabled={props.disabled}
              />
            )}
          </div>
        )}

        {propsWithDefault.variant === 'standard' && (
          <div className='relative flex items-center gap-2'>
            <input
              id={props.id}
              className={standardStyle.input}
              name={props.name}
              type='checkbox'
              checked={props.checked}
              onChange={props.onChange}
              disabled={props.disabled}
            />

            {propsWithDefault.checked && (
              <Icons
                className='pointer-events-none absolute'
                variant='checkmark'
                size='xs'
                color={propsWithDefault.checkmarkColor}
              />
            )}

            {props.label && (
              <Label
                className='cursor-pointer font-lato text-base font-light'
                variant='base_medium'
                for={props.id}
                text={props.label}
                disabled={props.disabled}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
