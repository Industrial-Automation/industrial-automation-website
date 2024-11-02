import React from 'react';

import { Text } from 'src/components/Text';
import { useModal } from 'src/hooks/useModal';
import { Button } from 'src/components/Button';
import { ModalNames } from 'src/constants/modals';

import Translations from './translations';

interface EmptyStatePropsType {
  projectId: string;
}

export const EmptyState: React.FC<EmptyStatePropsType> = (props) => {
  const modal = useModal();

  const handleAddProjectScreen = () => {
    if (props.projectId) {
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
          props: { projectId: props.projectId, order: 1 }
        }
      });
    }
  };

  return (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      <Text as='h2' variant='header_2' className='mb-5 font-lato text-main-white'>
        {Translations.title}
      </Text>

      <Text
        as='p'
        variant='base_medium'
        className='mb-10 w-3/5 text-center font-lato text-main-white'
      >
        {Translations.description}
      </Text>

      <Button
        variant='primary'
        color='skyblue'
        size='md'
        label={Translations.addScreenBtn}
        onClick={handleAddProjectScreen}
      />
    </div>
  );
};
