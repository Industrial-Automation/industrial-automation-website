import React, { useMemo } from 'react';

import { merge } from 'src/utils';
import { useModal } from 'src/hooks/useModal';
import { ModalNames } from 'src/constants/modals';
import { useClickOutside } from 'src/hooks/useClickOutside';

import { ModalFrameDefaultProps, ModalVariantProps, ModalVariants } from '../Modals';

const sizeClasses = {
  sm: 'w-1/4',
  md: 'w-2/6',
  lg: 'w-3/6'
};

type PopupModalType = {
  readonly className?: React.HTMLAttributes<HTMLDivElement>['className'];

  readonly size?: keyof typeof sizeClasses;
} & ModalFrameDefaultProps<ModalNames, keyof typeof ModalVariants>;

export const Popup: React.FC<PopupModalType> = (props) => {
  const propsWithDefault = merge(
    {
      size: 'md'
    } as Required<PopupModalType>,
    props
  );

  const modal = useModal();

  const modalRef = useClickOutside(() =>
    modal({
      name: propsWithDefault.name,
      show: false
    })
  );

  const blockWrapper = useMemo(
    () =>
      [
        'absolute',
        'right-0',
        'h-screen',
        'flex',
        'flex-col',
        'bg-main-white',
        sizeClasses[propsWithDefault.size]
      ].join(' '),
    [propsWithDefault.size]
  );

  return (
    <div ref={modalRef} className={blockWrapper}>
      {React.createElement(
        ModalVariants[propsWithDefault.variant.type] as React.FC<
          ModalVariantProps<keyof typeof ModalVariants>
        >,
        propsWithDefault.variant.props
      )}
    </div>
  );
};
