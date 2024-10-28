import React, { useMemo } from 'react';

import { useModal } from 'src/hooks/useModal';
import { Button } from 'src/components/Button';
import { ModalNames } from 'src/constants/modals';

import Translations from './translations';

interface ControlGaugeMenuPropsType {
  id: string;
  title: string;
  description: string;
  min_value: number;
  max_value: number;
  interval_value: number;
  unit: string;
  editable: boolean;
}

export const ControlGaugeMenu: React.FC<ControlGaugeMenuPropsType> = ({
  id,
  title,
  description,
  min_value,
  max_value,
  interval_value,
  unit,
  editable
}) => {
  const modal = useModal();

  const buttonClass = useMemo(
    () =>
      [
        '!w-full',
        '!justify-start',
        '!rounded',
        '!px-2',
        '!py-4',
        '!text-xs',
        '!font-medium',
        'text-main-white',
        'hover:bg-subtone-skyblue-1'
      ]
        .filter(Boolean)
        .join(' '),
    []
  );

  const handleUpdateControlGauge = () => {
    modal({
      name: ModalNames.ControlGaugeMenu,
      show: false
    });

    modal({
      name: ModalNames.UpdateControlGauge,
      show: true,
      isOverlay: true,
      frame: {
        type: 'modal',
        props: {}
      },
      variant: {
        type: 'updateControlGauge',
        props: { id, title, description, min_value, max_value, interval_value, unit, editable }
      }
    });
  };

  const handleDeleteControlGauge = () => {
    modal({
      name: ModalNames.ControlGaugeMenu,
      show: false
    });

    modal({
      name: ModalNames.DeleteControlGauge,
      show: true,
      isOverlay: true,
      frame: {
        type: 'modal',
        props: {}
      },
      variant: {
        type: 'deleteControlGauge',
        props: { id, title }
      }
    });
  };

  return (
    <div className='flex w-full flex-col items-center gap-2 p-2'>
      <Button
        className={buttonClass}
        variant='primary'
        size='sm'
        icon='pencil'
        iconSize='xs'
        iconPosition='left'
        label={Translations.editBtn}
        onClick={handleUpdateControlGauge}
      />

      <Button
        className={`${buttonClass} !text-main-red`}
        variant='primary'
        size='sm'
        icon='bin'
        iconSize='xs'
        iconPosition='left'
        iconColor='red'
        label={Translations.deleteBtn}
        onClick={handleDeleteControlGauge}
      />
    </div>
  );
};
