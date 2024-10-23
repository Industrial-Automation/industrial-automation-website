import React, { useMemo } from 'react';

import { useModal } from 'src/hooks/useModal';
import { Button } from 'src/components/Button';
import { ModalNames } from 'src/constants/modals';

import Translations from './translations';

interface ProjectScreenMenuPropsType {
  id: string;
  order: number;
  name: string;
  projectId: string;
  successAddCallback: () => void;
  successDeleteCallback: () => void;
}

export const ProjectScreenMenu: React.FC<ProjectScreenMenuPropsType> = ({
  id,
  name,
  order,
  projectId,
  successAddCallback,
  successDeleteCallback
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

  const handleAddScreen = () => {
    modal({
      name: ModalNames.ProjectScreenMenu,
      show: false
    });

    modal({
      name: ModalNames.AddProjectScreen,
      show: true,
      isOverlay: true,
      frame: {
        type: 'modal',
        props: {}
      },
      variant: {
        type: 'addProjectScreen',
        props: { order: order + 1, projectId, successCallback: successAddCallback }
      }
    });
  };

  const handleRenameScreen = () => {
    modal({
      name: ModalNames.ProjectScreenMenu,
      show: false
    });

    modal({
      name: ModalNames.UpdateProjectScreen,
      show: true,
      isOverlay: true,
      frame: {
        type: 'modal',
        props: {}
      },
      variant: {
        type: 'updateProjectScreen',
        props: { id, name }
      }
    });
  };

  const handleDeleteScreen = () => {
    modal({
      name: ModalNames.ProjectScreenMenu,
      show: false
    });

    modal({
      name: ModalNames.DeleteProjectScreen,
      show: true,
      isOverlay: true,
      frame: {
        type: 'modal',
        props: {}
      },
      variant: {
        type: 'deleteProjectScreen',
        props: { id, name, successCallback: successDeleteCallback }
      }
    });
  };

  return (
    <div className='flex w-full flex-col items-center gap-2 p-2'>
      <Button
        className={buttonClass}
        variant='primary'
        size='sm'
        icon='plus'
        iconSize='xs'
        iconPosition='left'
        label={Translations.addBtn}
        onClick={handleAddScreen}
      />

      <Button
        className={buttonClass}
        variant='primary'
        size='sm'
        icon='pencil'
        iconSize='xs'
        iconPosition='left'
        label={Translations.renameBtn}
        onClick={handleRenameScreen}
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
        onClick={handleDeleteScreen}
      />
    </div>
  );
};
