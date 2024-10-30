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

  readonly prioritySide?: 'left' | 'right';
} & ModalFrameDefaultProps<ModalNames, keyof typeof ModalVariants>;

interface ModalPositionType {
  top: number;
  left: number;
}

export const ContextModal: React.FC<ContextModalType> = (props) => {
  const propsWithDefault = merge(
    {
      size: 'md',
      prioritySide: 'right'
    } as Required<ContextModalType>,
    props
  );

  const modal = useModal();

  const modalRef = useClickOutside<HTMLDivElement>(
    () =>
      modal({
        name: propsWithDefault.name,
        show: false
      }),
    propsWithDefault.element
  );

  const [modalPosition, setModalPosition] = useState<ModalPositionType | null>(null);

  const blockWrapper = useMemo(
    () =>
      [
        'flex',
        'flex-col',
        'items-center',
        'justify-center',
        'bg-main-midnight',
        'rounded-lg',
        'invisible',
        sizeClasses[propsWithDefault.size],
        propsWithDefault.className
      ].join(' '),
    [propsWithDefault.className, propsWithDefault.size]
  );

  useEffect(() => {
    if (modalRef && modalRef.current) {
      const { left, top, right, height, width } = propsWithDefault.element.getBoundingClientRect();

      const x =
        propsWithDefault.prioritySide === 'right'
          ? left + width + 25
          : right - width - modalRef.current.offsetWidth - 25;
      const y = top - height;

      setModalPosition({
        left:
          window.innerWidth < x + modalRef.current.offsetWidth
            ? left - modalRef.current.offsetWidth - 25
            : x,
        top:
          window.innerHeight < y + modalRef.current.offsetHeight
            ? window.innerHeight - modalRef.current.offsetHeight - height
            : y
      });
    }
  }, [modalRef, propsWithDefault.element, propsWithDefault.prioritySide]);

  useEffect(() => {
    if (modalRef && modalRef.current && modalPosition) {
      modalRef.current.style.visibility = 'visible';
    }
  }, [modalPosition, modalRef]);

  return (
    <div className='absolute w-full' style={modalPosition || {}}>
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
