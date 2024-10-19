import React, { useMemo } from 'react';

import { useModal } from 'src/hooks/useModal';
import { Button } from 'src/components/Button';
import { ModalNames } from 'src/constants/modals';

import Translations from './translations';

export const ProjectMenu: React.FC = () => {
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
      name: ModalNames.AddProject,
      show: false
    });
  };

  const handleDeleteProject = () => {
    modal({
      name: ModalNames.AddProject,
      show: false
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
        className={buttonClass}
        variant='primary'
        size='sm'
        icon='bin'
        iconSize='xs'
        iconPosition='left'
        label={Translations.deleteBtn}
        onClick={handleDeleteProject}
      />
    </div>
  );
};
