import React, { useMemo } from 'react';

import { useModal } from 'src/hooks/useModal';
import { Button } from 'src/components/Button';
import { ModalNames } from 'src/constants/modals';

import Translations from './translations';

interface ProjectMenuPropsType {
  id: string;
  name: string;
}

export const ProjectMenu: React.FC<ProjectMenuPropsType> = ({ id, name }) => {
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

  const handleRenameProject = () => {
    modal({
      name: ModalNames.ProjectMenu,
      show: false
    });

    modal({
      name: ModalNames.UpdateProject,
      show: true,
      isOverlay: true,
      frame: {
        type: 'modal',
        props: {}
      },
      variant: {
        type: 'updateProject',
        props: { id, name }
      }
    });
  };

  const handleDeleteProject = () => {
    modal({
      name: ModalNames.ProjectMenu,
      show: false
    });

    modal({
      name: ModalNames.DeleteProject,
      show: true,
      isOverlay: true,
      frame: {
        type: 'modal',
        props: {}
      },
      variant: {
        type: 'deleteProject',
        props: { id, name }
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
        label={Translations.renameBtn}
        onClick={handleRenameProject}
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
        onClick={handleDeleteProject}
      />
    </div>
  );
};
