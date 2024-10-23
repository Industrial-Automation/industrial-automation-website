import React from 'react';

import { Button } from 'src/components/Button';
import { Upload } from 'src/components/Upload';
import { fetchUploadProjectScreen } from 'src/reducers/project-screens';

import SchemaImage from 'src/assets/images/schema.png';

import Translations from './translations';

interface SchemaStatePropsType {
  projectId: string;
}

export const Schema: React.FC<SchemaStatePropsType> = ({ projectId }) => {
  const isImage = false;

  const handleSelectFile = async (files: FileList) => {
    if (!files.length || files.length > 1) {
      throw new Error('Only 1 file!');
    }

    const file = files[0];

    const isValidFileExtension = /\.(png|jpeg|jpg)$/i.test(file.name);

    if (!isValidFileExtension) {
      throw new Error('Wrong file extension!');
    }

    await fetchUploadProjectScreen(projectId, file);
  };

  return (
    <div className='flex w-full flex-1 flex-col items-center'>
      <div className='mb-5 h-5/6 w-5/6'>
        {isImage ? (
          <img className='h-full w-full rounded-3xl object-fill' src={SchemaImage} alt='schema' />
        ) : (
          <Upload
            title={Translations.uploadTitle}
            description={Translations.uploadDescription}
            buttonText={Translations.uploadButton}
            onChangeFile={handleSelectFile}
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
