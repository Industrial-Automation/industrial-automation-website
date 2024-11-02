import React, { useMemo } from 'react';

import { merge } from 'src/utils';

const sizeClasses = {
  sm: 'w-7 h-7',
  md: 'w-12 h-12',
  lg: 'w-16 h-16'
};

const colorClasses = {
  white: 'border-main-white',
  skyblue: 'border-main-skyblue',
  midnight: 'border-main-midnight'
};

interface LoaderType {
  readonly className?: React.HTMLAttributes<HTMLDivElement>['className'];

  readonly size?: keyof typeof sizeClasses;

  readonly color?: keyof typeof colorClasses;
}

export const Loader = (props: LoaderType) => {
  const propsWithDefault = merge(
    {
      size: 'md',
      color: 'white'
    } as Required<LoaderType>,
    props
  );

  const loaderStyle = useMemo(
    () =>
      [
        'animate-spin',
        'rounded-full',
        'border-8',
        'border-solid',
        'border-t-transparent',

        propsWithDefault.className,
        colorClasses[propsWithDefault.color],
        sizeClasses[propsWithDefault.size]
      ]
        .filter(Boolean)
        .join(' '),
    [propsWithDefault.className, propsWithDefault.color, propsWithDefault.size]
  );

  return (
    <div className='flex h-full w-full items-center justify-center'>
      <div className={loaderStyle}></div>
    </div>
  );
};
