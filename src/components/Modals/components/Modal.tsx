import React, { useMemo } from 'react';

import { merge } from 'src/utils';
import { useModal } from 'src/hooks/useModal';
import { Button } from 'src/components/Button';
import { ModalNames } from 'src/constants/modals';
import { useClickOutside } from 'src/hooks/useClickOutside';

import { ModalFrameDefaultProps, ModalVariantProps, ModalVariants } from '../Modals';

const sizeClasses = {
  sm: 'w-1/4',
  md: 'w-2/6',
  lg: 'w-3/6'
};

type ModalType = {
  readonly className?: React.HTMLAttributes<HTMLDivElement>['className'];

  readonly size?: keyof typeof sizeClasses;
} & ModalFrameDefaultProps<ModalNames, keyof typeof ModalVariants>;

export const Modal: React.FC<ModalType> = (props) => {
  const propsWithDefault = merge(
    {
      size: 'md'
    } as Required<ModalType>,
    props
  );

  const modal = useModal();

  const modalRef = useClickOutside<HTMLDivElement>(() =>
    modal({
      name: propsWithDefault.name,
      show: false
    })
  );

  const blockWrapper = useMemo(
    () =>
      [
        'absolute',
        'flex',
        'flex-col',
        'bg-main-midnight',
        'p-4',
        'rounded-2xl',
        'max-h-[90%]',
        'overflow-hidden',
        'shadow-skyblue',
        sizeClasses[propsWithDefault.size]
      ].join(' '),
    [propsWithDefault.size]
  );

  const handleCloseModal = () => {
    modal({
      name: propsWithDefault.name,
      show: false
    });
  };

  return (
    <div ref={modalRef} className={blockWrapper}>
      <div className='flex justify-end'>
        <Button
          className='w-fit !rounded-full'
          icon='close'
          iconSize='xs'
          iconColor='black'
          color='white'
          onClick={handleCloseModal}
        />
      </div>

      {React.createElement(
        ModalVariants[propsWithDefault.variant.type] as React.FC<
          ModalVariantProps<keyof typeof ModalVariants>
        >,
        propsWithDefault.variant.props
      )}
    </div>
  );
};
