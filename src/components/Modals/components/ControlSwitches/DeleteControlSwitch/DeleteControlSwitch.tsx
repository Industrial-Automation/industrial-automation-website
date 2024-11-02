import React from 'react';

import { Text } from 'src/components/Text';
import { useModal } from 'src/hooks/useModal';
import { Button } from 'src/components/Button';
import { ModalNames } from 'src/constants/modals';
import { fetchDeleteControlSwitch } from 'src/reducers/control-switches';

import Translations from './translations';

interface DeleteControlSwitchPropsType {
  id: string;
  title: string;
}

export const DeleteControlSwitch: React.FC<DeleteControlSwitchPropsType> = (controlSwitch) => {
  const modal = useModal();

  const handleDeleteControlSwitch = async () => {
    if (controlSwitch.id) {
      await fetchDeleteControlSwitch(controlSwitch.id);

      modal({
        name: ModalNames.DeleteControlSwitch,
        show: false
      });
    }
  };

  return (
    <div className='flex flex-col items-center gap-5 px-10 pb-5'>
      <Text as='h2' variant='header_2' className='mb-5 font-lato text-main-white'>
        {Translations.deleteSwitchHeading}
      </Text>

      <div className='mb-5 flex flex-col gap-1'>
        <Text
          as='p'
          align='center'
          variant='base_medium'
          className='text-center font-lato text-main-white'
        >
          {Translations.deleteSwitchQuestion}
        </Text>

        <Text
          as='p'
          align='center'
          variant='base_medium'
          className='text-center font-lato text-main-white'
        >
          {`("${controlSwitch.title}")`}
        </Text>
      </div>

      <Button
        className='w-64'
        variant='secondary'
        color='red'
        size='md'
        label={Translations.deleteSwitchBtn}
        onClick={handleDeleteControlSwitch}
      />
    </div>
  );
};
