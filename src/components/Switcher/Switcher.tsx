import React, { KeyboardEvent, useMemo, useState } from 'react';

import { merge } from 'src/utils';
import { Label } from 'src/components/Label';

const sizeClasses = {
  sm: {
    barStyle: 'w-12 h-6',
    circleStyle: 'w-4 h-4',
    translate: 'translate-x-6'
  },
  md: {
    barStyle: 'w-16 h-8',
    circleStyle: 'w-6 h-6',
    translate: 'translate-x-8'
  },
  lg: {
    barStyle: 'w-20 h-10',
    circleStyle: 'w-8 h-8',
    translate: 'translate-x-10'
  }
};

const colorClasses = {
  white: 'bg-main-white',
  gray: 'bg-main-gray',
  skyblue: 'bg-main-skyblue',
  midnight: 'bg-main-midnight'
};

interface SwitcherType {
  readonly className?: React.HTMLAttributes<HTMLDivElement>['className'];
  readonly labelClassName?: React.HTMLAttributes<HTMLDivElement>['className'];
  readonly containerClassName?: React.HTMLAttributes<HTMLDivElement>['className'];

  readonly barColor?: keyof typeof colorClasses;
  readonly checkedBarColor?: keyof typeof colorClasses;

  readonly circleColor?: keyof typeof colorClasses;

  readonly size?: keyof typeof sizeClasses;

  readonly value?: boolean;

  readonly label?: string;

  readonly onChange?: (isChecked: boolean) => void;
}

export const Switcher = (props: SwitcherType) => {
  const propsWithDefault = merge(
    {
      barColor: 'white',
      checkedBarColor: 'white',
      circleColor: 'skyblue',
      size: 'md',
      value: false
    } as Required<SwitcherType>,
    props
  );

  const [isChecked, setIsChecked] = useState(propsWithDefault.value);

  const containerStyle = useMemo(
    () =>
      ['flex', 'flex-row', 'items-center', 'gap-3', propsWithDefault.containerClassName]
        .filter(Boolean)
        .join(' '),
    [propsWithDefault.containerClassName]
  );

  const barStyle = useMemo(
    () =>
      [
        'flex',
        'items-center',
        'rounded-full',
        'p-1',
        'cursor-pointer',
        'transition-colors',
        sizeClasses[propsWithDefault.size].barStyle,
        colorClasses[isChecked ? propsWithDefault.checkedBarColor : propsWithDefault.barColor],
        propsWithDefault.className
      ]
        .filter(Boolean)
        .join(' '),
    [
      propsWithDefault.size,
      propsWithDefault.checkedBarColor,
      propsWithDefault.barColor,
      propsWithDefault.className,
      isChecked
    ]
  );

  const circleStyle = useMemo(
    () =>
      [
        'transform',
        'rounded-full',
        'shadow-md',
        'transition-transform',
        isChecked ? sizeClasses[propsWithDefault.size].translate : 'translate-x-0',
        sizeClasses[propsWithDefault.size].circleStyle,
        colorClasses[propsWithDefault.circleColor]
      ]
        .filter(Boolean)
        .join(' '),
    [isChecked, propsWithDefault.circleColor, propsWithDefault.size]
  );

  const handleSwitch = () => {
    setIsChecked((prevState) => {
      const newCheckedState = !prevState;

      if (propsWithDefault.onChange) {
        propsWithDefault.onChange(newCheckedState);
      }

      return newCheckedState;
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleSwitch();
    }
  };

  return (
    <div className={containerStyle}>
      <Label
        className={propsWithDefault.labelClassName}
        text={propsWithDefault.label}
        variant={propsWithDefault.size === 'sm' ? 'base_medium' : 'header_3'}
      />

      <div
        role='button'
        tabIndex={0}
        aria-pressed={isChecked}
        className={barStyle}
        onClick={handleSwitch}
        onKeyDown={handleKeyDown}
      >
        <div className={circleStyle}></div>
      </div>
    </div>
  );
};
