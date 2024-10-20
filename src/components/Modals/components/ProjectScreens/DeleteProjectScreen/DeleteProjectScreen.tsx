import React from 'react';

import { Text } from 'src/components/Text';
import { useModal } from 'src/hooks/useModal';
import { Button } from 'src/components/Button';
import { ModalNames } from 'src/constants/modals';
import { fetchDeleteProjectScreen } from 'src/reducers/project-screens';

import Translations from './translations';

interface DeleteProjectScreenPropsType {
  id: string;
  name: string;
}

export const DeleteProjectScreen: React.FC<DeleteProjectScreenPropsType> = (projectScreen) => {
  const modal = useModal();

  const handleDeleteProjectScreen = async () => {
    if (projectScreen.id) {
      await fetchDeleteProjectScreen(projectScreen.id);

      modal({
        name: ModalNames.DeleteProjectScreen,
        show: false
      });
    }
  };

  return (
    <div className='flex flex-col items-center gap-5 px-10 pb-5'>
      <Text as='h2' variant='header_2' className='mb-5 font-lato text-main-white'>
        {Translations.deleteProjectScreenHeading}
      </Text>

      <div className='mb-5 flex flex-col gap-1'>
        <Text
          as='p'
          align='center'
          variant='base_medium'
          className='text-center font-lato text-main-white'
        >
          {Translations.deleteProjectScreenQuestion}
        </Text>

        <Text
          as='p'
          align='center'
          variant='base_medium'
          className='text-center font-lato text-main-white'
        >
          {`("${projectScreen.name}")`}
        </Text>
      </div>

      <Button
        className='w-64'
        variant='secondary'
        color='red'
        size='md'
        label={Translations.deleteProjectScreenBtn}
        onClick={handleDeleteProjectScreen}
      />
    </div>
  );
};
