import React, { useMemo } from 'react';

import { merge } from 'src/utils';

const colorClasses = {
  white: 'bg-main-white',
  gray: 'bg-main-gray',
  skyblue: 'bg-main-skyblue',
  midnight: 'bg-main-midnight'
};

interface CircleProgressGradientType {
  stop: number;
  color: keyof typeof colorClasses;
}

interface CircleProgressType {
  readonly className?: React.HTMLAttributes<HTMLDivElement>['className'];

  readonly value?: number;
  readonly unit?: string;

  readonly width?: number;
  readonly height?: number;

  readonly strokeWidth?: number;
  readonly ballStrokeWidth?: number;
  readonly reduction?: number;

  readonly transitionDuration?: number;
  readonly transitionTimingFunction?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';

  readonly barColor?: keyof typeof colorClasses;
  readonly circleColor?: keyof typeof colorClasses;

  readonly gradient?: CircleProgressGradientType[];
}

export const CircleProgress = (props: CircleProgressType) => {
  const propsWithDefault = merge(
    {
      value: 0,
      unit: '%',
      width: 200,
      height: 200,
      strokeWidth: 4,
      ballStrokeWidth: 16,
      reduction: 0.25,
      transitionDuration: 0.5,
      transitionTimingFunction: 'ease',
      barColor: 'white',
      circleColor: 'skyblue',
      gradient: [
        { stop: 0.0, color: 'skyblue' },
        { stop: 1, color: 'skyblue' }
      ]
    } as Required<CircleProgressType>,
    props
  );

  const id = useMemo(() => Math.random().toString(), []);

  const progress = Math.round(propsWithDefault.value * 100) / 100;

  const center = propsWithDefault.width / 2;
  const rotate = 90 + 180 * propsWithDefault.reduction;
  const r = center - propsWithDefault.strokeWidth / 2 - propsWithDefault.ballStrokeWidth / 2;
  const circumference = Math.PI * r * 2;
  const offset = (circumference * (100 - progress * (1 - propsWithDefault.reduction))) / 100;

  const style = useMemo(
    () => ['relative', propsWithDefault.className].filter(Boolean).join(' '),
    [propsWithDefault.className]
  );

  return (
    <div className={style}>
      <svg
        viewBox={`0 0 ${propsWithDefault.width} ${propsWithDefault.height}`}
        className={'block w-full'}
      >
        <defs>
          <linearGradient id={'gradient' + id} x1='0%' y1='0%' x2='0%' y2='100%'>
            {propsWithDefault.gradient.map(({ stop, color }) => (
              <stop key={stop} offset={stop * 100 + ('%' || '')} stopColor={color} />
            ))}
          </linearGradient>
        </defs>

        <text x={center + 5} y={center + 10} textAnchor='middle' fontSize='40' fill='#ffffff'>
          {progress}
          {propsWithDefault.unit}
        </text>

        <circle
          transform={`rotate(${rotate} ${center} ${center})`}
          id='path'
          cx={center}
          cy={center}
          r={r}
          strokeWidth={propsWithDefault.strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * propsWithDefault.reduction}
          fill='none'
          stroke={propsWithDefault.barColor}
          strokeLinecap='round'
        />

        <circle
          style={{
            transition: `stroke-dashoffset ${propsWithDefault.transitionDuration}s ${propsWithDefault.transitionTimingFunction}`
          }}
          transform={`rotate(${rotate} ${center} ${center})`}
          id='path'
          cx={center}
          cy={center}
          r={r}
          strokeWidth={propsWithDefault.strokeWidth}
          strokeDasharray={`${circumference}`}
          strokeDashoffset={offset}
          fill='none'
          stroke={`url(#gradient${id})`}
          strokeLinecap='round'
        />

        <circle
          style={{
            transition: `stroke-dashoffset ${propsWithDefault.transitionDuration}s ${propsWithDefault.transitionTimingFunction}`
          }}
          transform={`rotate(${rotate} ${center} ${center})`}
          id='path'
          cx={center}
          cy={center}
          r={r}
          strokeWidth={propsWithDefault.ballStrokeWidth}
          strokeDasharray={`1 ${circumference}`}
          strokeDashoffset={offset}
          fill='none'
          stroke={propsWithDefault.circleColor}
          strokeLinecap='round'
        />
      </svg>
    </div>
  );
};
