import React, { useMemo } from 'react';

import { merge } from 'src/utils';

import { Icons, IconsType } from '../Icons';

const variantClasses = {
  primary: 'text-white',
  secondary: 'text-black !rounded-full'
};

const colorClasses = {
  skyblue: 'bg-main-skyblue hover:bg-subtone-skyblue-1 active:bg-subtone-skyblue-1 focus:ring-white'
};

const sizeClasses = {
  sm: 'h-7 px-2 py-1 text-sm',
  md: 'h-9 px-4 py-3 text-base',
  lg: 'h-12 px-7 py-5 text-base'
};

const iconPosClasses = {
  left: '[&>span]:order-none',
  right: '[&>span]:order-1'
};

interface ButtonType {
  readonly className?: React.HTMLAttributes<HTMLDivElement>['className'];
  readonly as?: 'button' | 'a' | 'div' | 'span';

  readonly label?: string;

  readonly type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];

  readonly href?: string;
  readonly target?: '_blank' | '_self' | '_parent' | '_top';

  readonly variant?: keyof typeof variantClasses;
  readonly color?: keyof typeof colorClasses;
  readonly size?: keyof typeof sizeClasses;

  readonly iconClassName?: React.HTMLAttributes<HTMLElement>['className'];
  readonly icon?: IconsType['variant'];
  readonly iconSize?: IconsType['size'];
  readonly iconColor?: IconsType['color'];
  readonly iconPosition?: keyof typeof iconPosClasses;
  readonly iconOnly?: boolean;

  readonly disabled?: boolean;

  readonly onClick?: (e: MouseEvent) => void;
}

export const Button = (props: ButtonType) => {
  const propsWithDefault = merge(
    {
      as: 'button',
      variant: 'primary',
      size: 'sm',
      iconPosition: 'left',
      disabled: false
    } as Required<ButtonType>,
    props
  );

  const elementClasses = useMemo(
    () =>
      [
        'flex',
        'items-center',
        'justify-center',
        'gap-2',
        'rounded-md',
        'duration-200',
        'font-bold',
        'select-none',
        propsWithDefault.disabled
          ? '!text-main-gray bg-subtone-gray-3 cursor-default'
          : 'cursor-pointer',
        iconPosClasses[propsWithDefault.iconPosition],
        variantClasses[propsWithDefault.variant],
        colorClasses[propsWithDefault.color],
        sizeClasses[propsWithDefault.size],
        propsWithDefault.className
      ]
        .filter(Boolean)
        .join(' '),
    [propsWithDefault]
  );

  const handleClick = (e: MouseEvent) =>
    propsWithDefault.disabled
      ? null
      : propsWithDefault.onClick
        ? propsWithDefault.onClick(e)
        : null;

  return React.createElement(
    propsWithDefault.as,
    {
      className: elementClasses,
      disabled: propsWithDefault.disabled,
      onClick: handleClick
    },
    propsWithDefault.icon && (
      <Icons
        className={propsWithDefault.iconClassName}
        variant={propsWithDefault.icon}
        color={propsWithDefault.iconColor}
        size={propsWithDefault.iconSize}
      />
    ),
    !propsWithDefault.iconOnly && propsWithDefault.label
  );
};
