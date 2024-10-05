import React, { useMemo } from 'react';

import { merge } from 'src/utils';

import { Icons, IconsType } from '../Icons';

const as = ['span', 'p', 'label', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a'] as const;

const variantClasses = {
  header_1: 'text-5xl font-bold',
  header_2: 'text-2xl font-semibold',
  header_3: 'text-xl font-semibold',
  base_bold: 'text-base font-bold',
  base_medium: 'text-base font-medium',
  base_extrabold: 'text-base font-extrabold',
  sm_extrabold: 'text-sm font-extrabold',
  sm_bold: 'text-sm font-bold',
  sm_medium: 'text-sm font-medium'
};

const alignClasses = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end'
};

const iconPosClasses = {
  left: '[&>span]:-order-1',
  right: '[&>span]:order-none'
};

export interface TextType {
  readonly className?: React.HTMLAttributes<HTMLDivElement>['className'];
  readonly as?: (typeof as)[number];

  readonly children: React.ReactNode;

  readonly variant?: keyof typeof variantClasses;
  readonly align?: keyof typeof alignClasses;

  readonly for?: string;
  readonly href?: string;

  readonly icon?: IconsType['variant'];
  readonly iconClassName?: React.HTMLAttributes<HTMLElement>['className'];
  readonly iconColor?: IconsType['color'];
  readonly iconSize?: IconsType['size'];
  readonly iconPosition?: 'left' | 'right';
}

export const Text = (props: TextType) => {
  const propsWithDefault = merge(
    {
      as: 'span',
      variant: 'base_medium',
      align: 'left'
    } as Required<TextType>,
    props
  );

  const elementClasses = useMemo(
    () =>
      [
        'flex',
        'items-center',
        'gap-1',
        variantClasses[propsWithDefault.variant],
        alignClasses[propsWithDefault.align],
        iconPosClasses[propsWithDefault.iconPosition],
        propsWithDefault.className
      ]
        .filter(Boolean)
        .join(' '),
    [
      propsWithDefault.align,
      propsWithDefault.className,
      propsWithDefault.iconPosition,
      propsWithDefault.variant
    ]
  );

  return React.createElement(
    propsWithDefault.as,
    {
      className: elementClasses,
      href: propsWithDefault.href,
      htmlFor: propsWithDefault.for
    },
    propsWithDefault.children,
    propsWithDefault.icon && (
      <Icons
        className={propsWithDefault.iconClassName}
        variant={propsWithDefault.icon}
        color={propsWithDefault.iconColor}
        size={propsWithDefault.iconSize}
      />
    )
  );
};
