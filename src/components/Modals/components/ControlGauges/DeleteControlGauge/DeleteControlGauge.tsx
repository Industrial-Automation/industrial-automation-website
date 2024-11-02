import React from 'react';

import { Text } from 'src/components/Text';
import { useModal } from 'src/hooks/useModal';
import { Button } from 'src/components/Button';
import { ModalNames } from 'src/constants/modals';
import { fetchDeleteControlGauge } from 'src/reducers/control-gauges';

import Translations from './translations';

interface DeleteControlGaugePropsType {
  id: string;
  title: string;
}

export const DeleteControlGauge: React.FC<DeleteControlGaugePropsType> = (controlGauge) => {
  const modal = useModal();

  const handleDeleteControlGauge = async () => {
    if (controlGauge.id) {
      await fetchDeleteControlGauge(controlGauge.id);

      modal({
        name: ModalNames.DeleteControlGauge,
        show: false
      });
    }
  };

  return (
    <div className='flex flex-col items-center gap-5 px-10 pb-5'>
      <Text as='h2' variant='header_2' className='mb-5 font-lato text-main-white'>
        {Translations.deleteGaugeHeading}
      </Text>

      <div className='mb-5 flex flex-col gap-1'>
        <Text
          as='p'
          align='center'
          variant='base_medium'
          className='text-center font-lato text-main-white'
        >
          {Translations.deleteGaugeQuestion}
        </Text>

        <Text
          as='p'
          align='center'
          variant='base_medium'
          className='text-center font-lato text-main-white'
        >
          {`("${controlGauge.title}")`}
        </Text>
      </div>

      <Button
        className='w-64'
        variant='secondary'
        color='red'
        size='md'
        label={Translations.deleteGaugeBtn}
        onClick={handleDeleteControlGauge}
      />
    </div>
  );
};
