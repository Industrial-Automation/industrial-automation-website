import React from 'react';

import { Text } from 'src/components/Text';
import { useModal } from 'src/hooks/useModal';
import { Button } from 'src/components/Button';
import { ModalNames } from 'src/constants/modals';
import { fetchDeleteProject } from 'src/reducers/projects';

import Translations from './translations';

interface DeleteProjectPropsType {
  id: string;
  name: string;
}

export const DeleteProject: React.FC<DeleteProjectPropsType> = (project) => {
  const modal = useModal();

  const handleDeleteProject = async () => {
    if (project.id) {
      await fetchDeleteProject(project.id);

      modal({
        name: ModalNames.DeleteProject,
        show: false
      });
    }
  };

  return (
    <div className='flex flex-col items-center gap-5 px-10 pb-5'>
      <Text as='h2' variant='header_2' className='mb-5 font-lato text-main-white'>
        {Translations.deleteProjectHeading}
      </Text>

      <div className='mb-5 flex flex-col gap-1'>
        <Text
          as='p'
          align='center'
          variant='base_medium'
          className='text-center font-lato text-main-white'
        >
          {Translations.deleteProjectQuestion}
        </Text>

        <Text
          as='p'
          align='center'
          variant='base_medium'
          className='text-center font-lato text-main-white'
        >
          {`("${project.name}")`}
        </Text>
      </div>

      <Button
        className='w-64'
        variant='secondary'
        color='red'
        size='md'
        label={Translations.deleteProjectBtn}
        onClick={handleDeleteProject}
      />
    </div>
  );
};
