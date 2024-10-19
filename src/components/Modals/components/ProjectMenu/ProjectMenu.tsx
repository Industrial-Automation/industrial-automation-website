import React from 'react';

import { useModal } from 'src/hooks/useModal';
import { Button } from 'src/components/Button';
import { ModalNames } from 'src/constants/modals';

import Translations from './translations';

export const ProjectMenu: React.FC = () => {
  const modal = useModal();

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
    <div className='flex flex-col items-center gap-5 px-10 pb-5'>
      <Button
        variant='secondary'
        color='skyblue'
        size='md'
        label={Translations.renameBtn}
        onClick={handleRenameProject}
      />

      <Button
        variant='secondary'
        color='skyblue'
        size='md'
        label={Translations.deleteBtn}
        onClick={handleDeleteProject}
      />
    </div>
  );
};
