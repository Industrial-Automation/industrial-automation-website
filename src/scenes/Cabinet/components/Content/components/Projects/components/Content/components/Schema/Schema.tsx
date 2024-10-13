import { Button } from 'src/components/Button';
import { Upload } from 'src/components/Upload';

import SchemaImage from 'src/assets/images/schema.png';

import Translations from './translations';

export const Schema = () => {
  const isImage = false;

  return (
    <div className='flex w-full flex-1 flex-col items-center justify-between'>
      <div className='h-5/6 w-5/6'>
        {isImage ? (
          <img className='h-full w-full rounded-3xl object-fill' src={SchemaImage} alt='schema' />
        ) : (
          <Upload
            title={Translations.uploadTitle}
            description={Translations.uploadDescription}
            buttonText={Translations.uploadButton}
          />
        )}
      </div>

      <div className='flex flex-row gap-5'>
        <Button icon='text' iconSize='xs' iconColor='white' onClick={() => {}} />

        <Button icon='input' iconSize='xs' iconColor='white' onClick={() => {}} />

        <Button icon='bulb' iconSize='xs' iconColor='white' onClick={() => {}} />
      </div>
    </div>
  );
};
