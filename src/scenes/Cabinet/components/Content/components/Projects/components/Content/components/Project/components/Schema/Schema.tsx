import React from 'react';

import { Button } from 'src/components/Button';
import { Upload } from 'src/components/Upload';
import { fetchUploadProjectScreen, ProjectScreenType } from 'src/reducers/project-screens';

import Translations from './translations';

interface SchemaStatePropsType {
  projectScreen: ProjectScreenType;
}

export const Schema: React.FC<SchemaStatePropsType> = ({ projectScreen }) => {
  const handleSelectFile = async (files: FileList) => {
    if (!files.length || files.length > 1) {
      throw new Error('Only 1 file!');
    }

    const file = files[0];

    const isValidFileExtension = /\.(png|jpeg|jpg)$/i.test(file.name);

    if (!isValidFileExtension) {
      throw new Error('Wrong file extension!');
    }

    const formData = new FormData();

    formData.append('file', file);

    await fetchUploadProjectScreen(projectScreen.id, formData);
  };

  return (
    <div className='flex h-full w-full flex-col items-center overflow-hidden'>
      <div className='mb-5 h-full w-full overflow-hidden px-14'>
        {projectScreen.schema_url ? (
          <img
            className='h-full w-full rounded-3xl object-fill'
            src={projectScreen.schema_url}
            alt='schema'
          />
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
