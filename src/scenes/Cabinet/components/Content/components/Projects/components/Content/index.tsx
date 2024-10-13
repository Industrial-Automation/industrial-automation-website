import { Text } from 'src/components/Text';
import { Button } from 'src/components/Button';

import { Schema } from './components/Schema';

export const Content = () => {
  return (
    <div className='flex w-full flex-col items-center justify-between p-2'>
      <div className='mb-10 flex w-full flex-row items-center justify-between'>
        <Button
          className='!rounded-full !py-5'
          icon='arrow_left'
          iconSize='sm'
          iconColor='white'
          color='skyblue'
          onClick={() => {}}
        />

        <Text as='h2' variant='header_2' className='text-center font-lato text-main-white'>
          Screen 1
        </Text>

        <Button
          className='!rounded-full !py-5'
          icon='arrow_right'
          iconSize='sm'
          iconColor='white'
          color='skyblue'
          onClick={() => {}}
        />
      </div>

      <Schema />
    </div>
  );
};
