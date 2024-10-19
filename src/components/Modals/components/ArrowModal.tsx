import React, { useEffect, useMemo, useState } from 'react';

import { merge } from 'src/utils';
import { useModal } from 'src/hooks/useModal';
import { ModalNames } from 'src/constants/modals';
import { useClickOutside } from 'src/hooks/useClickOutside';

import { ModalFrameDefaultProps, ModalVariantProps, ModalVariants } from '../Modals';

const sizeClasses = {
  sm: 'w-1/6 max-h-60',
  md: 'w-2/6 max-h-80',
  lg: 'w-3/6 max-h-96'
};

type ArrowModalType = {
  readonly className?: React.HTMLAttributes<HTMLDivElement>['className'];

  readonly size?: keyof typeof sizeClasses;

  readonly element: Element;
} & ModalFrameDefaultProps<ModalNames, keyof typeof ModalVariants>;

export const ArrowModal: React.FC<ArrowModalType> = (props) => {
  const propsWithDefault = merge(
    {
      size: 'md'
    } as Required<ArrowModalType>,
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

      setModalPosition({
        left: left + width / 1.5 - modalRef.current.offsetWidth,
        top: top + height
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
        sizeClasses[propsWithDefault.size]
      ].join(' '),
    [propsWithDefault.size]
  );

  return (
    <div className='absolute w-full' style={modalPosition}>
      <div ref={modalRef} className='flex flex-col items-end'>
        <div
          className={[
            'h-0 w-0',
            'border-l-[10px] border-l-transparent',
            'border-b-[17px] border-b-main-white',
            'border-r-[10px] border-r-transparent'
          ].join(' ')}
        ></div>

        <div className={blockWrapper}>
          {React.createElement(
            ModalVariants[propsWithDefault.variant.type] as React.FC<
              ModalVariantProps<keyof typeof ModalVariants>
            >,
            propsWithDefault.variant.props
          )}
        </div>
      </div>
    </div>
  );
};
