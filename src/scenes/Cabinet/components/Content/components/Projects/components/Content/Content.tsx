import { Text } from 'src/components/Text';
import { Button } from 'src/components/Button';

import Schema from 'src/assets/images/schema.png';

export const Content = () => {
  return (
    <div className='flex w-full flex-col items-center justify-between p-2'>
      <div className='flex w-full flex-row items-center justify-between'>
        <Button
          className='!rounded-full !py-5'
          icon='arrow_left'
          iconSize='sm'
          iconColor='white'
          color='skyblue'
          onClick={() => {}}
        />

        <Text as='h2' variant='header_2' className='text-center font-lato text-main-black'>
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

      <div className='h-[80%] w-[90%]'>
        <img className='h-full w-full rounded-3xl object-fill' src={Schema} alt='schema' />
      </div>

      <div className='flex flex-row gap-5'>
        <Button icon='text' iconSize='xs' onClick={() => {}} />

        <Button icon='input' iconSize='xs' onClick={() => {}} />

        <Button icon='bulb' iconSize='xs' onClick={() => {}} />
      </div>
    </div>
  );
};
