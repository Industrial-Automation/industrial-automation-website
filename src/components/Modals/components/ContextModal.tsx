import React, { useEffect, useMemo, useState } from 'react';

import { merge } from 'src/utils';
import { useModal } from 'src/hooks/useModal';
import { ModalNames } from 'src/constants/modals';
import { useClickOutside } from 'src/hooks/useClickOutside';

import { ModalFrameDefaultProps, ModalVariantProps, ModalVariants } from '../Modals';

const sizeClasses = {
  sm: 'w-44 max-h-40',
  md: 'w-52 max-h-52',
  lg: 'w-60 max-h-60'
};

type ContextModalType = {
  readonly className?: React.HTMLAttributes<HTMLDivElement>['className'];

  readonly size?: keyof typeof sizeClasses;

  readonly element: Element;
} & ModalFrameDefaultProps<ModalNames, keyof typeof ModalVariants>;

export const ContextModal: React.FC<ContextModalType> = (props) => {
  const propsWithDefault = merge(
    {
      size: 'md'
    } as Required<ContextModalType>,
    props
  );

  const modal = useModal();

  const modalRef = useClickOutside(
    () =>
      modal({
        name: propsWithDefault.name,
        show: false
      }),
    propsWithDefault.element
  );

  const [modalPosition, setModalPosition] = useState({
    top: 0,
    left: 0
  });

  useEffect(() => {
    if (modalRef && modalRef.current) {
      const { left, top, height, width } = propsWithDefault.element.getBoundingClientRect();

      const y = top - height;

      setModalPosition({
        left: left + width + 25,
        top:
          window.innerHeight < y + modalRef.current.offsetHeight
            ? window.innerHeight - modalRef.current.offsetHeight - height
            : y
      });
    }
  }, [modalRef, propsWithDefault.element]);

  const blockWrapper = useMemo(
    () =>
      [
        'flex',
        'flex-col',
        'items-center',
        'justify-center',
        'bg-main-midnight',
        'rounded-lg',
        sizeClasses[propsWithDefault.size],
        propsWithDefault.className
      ].join(' '),
    [propsWithDefault.className, propsWithDefault.size]
  );

  return (
    <div className='absolute w-full' style={modalPosition}>
      <div ref={modalRef} className={blockWrapper}>
        {React.createElement(
          ModalVariants[propsWithDefault.variant.type] as React.FC<
            ModalVariantProps<keyof typeof ModalVariants>
          >,
          propsWithDefault.variant.props
        )}
      </div>
    </div>
  );
};
