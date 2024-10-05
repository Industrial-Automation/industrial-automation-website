import React, { useMemo } from 'react';

import { merge } from 'src/utils';

import User from 'src/assets/icons/user.svg';

const Icon = Object.freeze({
  user: User
});

const IconSizes = Object.freeze({
  xs: 'w-4 h-4',
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-10 h-10',
  xl: 'w-12 h-12'
});

export interface IconType extends React.HTMLAttributes<HTMLElement> {
  readonly className?: React.HTMLAttributes<HTMLElement>['className'];

  readonly size?: keyof typeof IconSizes;
  readonly color?: string;
}

export interface IconsType extends IconType {
  readonly variant: keyof typeof Icon;
}

export const Icons = (props: IconsType) => {
  const propsWithDefault = merge(
    {
      size: 'md'
    } as Required<IconsType>,
    props
  );

  const elementClasses = useMemo(
    () => [IconSizes[propsWithDefault.size], propsWithDefault.className].filter(Boolean).join(' '),
    [propsWithDefault]
  );

  return React.createElement(Icon[propsWithDefault.variant], {
    color: propsWithDefault.color,
    className: elementClasses,
    onClick: propsWithDefault.onClick,
    onMouseEnter: propsWithDefault.onMouseEnter,
    onMouseLeave: propsWithDefault.onMouseLeave
  });
};
