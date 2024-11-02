import React, { useMemo } from 'react';

import { Text, TextType } from '../Text';

interface LabelType extends React.LabelHTMLAttributes<HTMLLabelElement> {
  readonly text: string;
  readonly for?: string;

  readonly variant?: TextType['variant'];

  readonly required?: boolean;
  readonly disabled?: boolean;
}

export const Label = (props: LabelType) => {
  const style = useMemo(() => {
    const elementClasses = ['flex', 'items-center', 'gap-1', 'text-text-default'];

    if (props.disabled) {
      elementClasses.push('!text-text-disabled [&>div>span]:!text-neutral-grey-500');
    }

    if (props.className) {
      elementClasses.push(props.className);
    }

    return elementClasses.join(' ');
  }, [props]);

  return (
    <Text as='label' variant={props.variant || 'base_bold'} for={props.for} className={style}>
      {props.text}

      {props.required && <span className='text-main-red'>*</span>}
    </Text>
  );
};
