import { Button } from 'src/components/Button';

import SchemaImage from 'src/assets/images/schema.png';

export const Schema = () => {
  return (
    <div className='flex flex-1 flex-col items-center justify-between'>
      <div className='h-5/6 w-full'>
        <img className='h-full w-full rounded-3xl object-fill' src={SchemaImage} alt='schema' />
      </div>

      <div className='flex flex-row gap-5'>
        <Button icon='text' iconSize='xs' iconColor='white' onClick={() => {}} />

        <Button icon='input' iconSize='xs' iconColor='white' onClick={() => {}} />

        <Button icon='bulb' iconSize='xs' iconColor='white' onClick={() => {}} />
      </div>
    </div>
  );
};
