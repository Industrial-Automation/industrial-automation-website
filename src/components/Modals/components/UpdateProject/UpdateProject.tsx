import React, { useState } from 'react';

import { Text } from 'src/components/Text';
import { Input } from 'src/components/Input';
import { useModal } from 'src/hooks/useModal';
import { Button } from 'src/components/Button';
import { ModalNames } from 'src/constants/modals';
import { fetchUpdateProject } from 'src/reducers/projects';

import Translations from './translations';

export const UpdateProject: React.FC<{ id: string }> = ({ id }) => {
  const modal = useModal();

  const [name, setName] = useState('');

  const handleAddProject = async () => {
    if (name) {
      await fetchUpdateProject(id, { name });

      modal({
        name: ModalNames.UpdateProject,
        show: false
      });
    }
  };

  return (
    <div className='flex flex-col items-center gap-5 px-10 pb-5'>
      <Text as='h2' variant='header_2' className='mb-5 font-lato text-main-white'>
        {Translations.updateProjectHeading}
      </Text>

      <Input
        className='mb-5 h-14 w-80 bg-main-white shadow-skyblue ring-0 [&>input]:text-sm'
        labelClassName='text-main-white'
        value={name}
        placeholder={Translations.namePlaceholder}
        onChange={(e) => setName(e.target.value)}
      />

      <Button
        className='w-64'
        variant='secondary'
        color='skyblue'
        size='md'
        label={Translations.renameProjectBtn}
        onClick={handleAddProject}
      />
    </div>
  );
};
