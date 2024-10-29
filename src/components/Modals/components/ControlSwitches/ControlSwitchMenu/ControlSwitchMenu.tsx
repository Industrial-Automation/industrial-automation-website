import React, { useMemo } from 'react';

import { useModal } from 'src/hooks/useModal';
import { Button } from 'src/components/Button';
import { ModalNames } from 'src/constants/modals';

import Translations from './translations';

interface ControlSwitchMenuPropsType {
  id: string;
  title: string;
  description: string;
  tag: string;
  editable: boolean;
}

export const ControlSwitchMenu: React.FC<ControlSwitchMenuPropsType> = ({
  id,
  title,
  description,
  tag,
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

  const handleUpdateControlSwitch = () => {
    modal({
      name: ModalNames.ControlSwitchMenu,
      show: false
    });

    modal({
      name: ModalNames.UpdateControlSwitch,
      show: true,
      isOverlay: true,
      frame: {
        type: 'modal',
        props: {}
      },
      variant: {
        type: 'updateControlSwitch',
        props: { id, title, description, tag, editable }
      }
    });
  };

  const handleDeleteControlSwitch = () => {
    modal({
      name: ModalNames.ControlSwitchMenu,
      show: false
    });

    modal({
      name: ModalNames.DeleteControlSwitch,
      show: true,
      isOverlay: true,
      frame: {
        type: 'modal',
        props: {}
      },
      variant: {
        type: 'deleteControlSwitch',
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
        onClick={handleUpdateControlSwitch}
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
        onClick={handleDeleteControlSwitch}
      />
    </div>
  );
};
