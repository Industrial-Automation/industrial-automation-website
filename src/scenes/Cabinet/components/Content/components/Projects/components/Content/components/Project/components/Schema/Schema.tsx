import React, { useMemo } from 'react';

import { Button } from 'src/components/Button';
import { Upload } from 'src/components/Upload';
import { fetchUploadProjectScreen, ProjectScreenType } from 'src/reducers/project-screens';

import { TextElement } from './components/TextElement';
import { BulbElement } from './components/BulbElement';
import { InputElement } from './components/InputElement';

import Translations from './translations';

interface SchemaStatePropsType {
  projectScreen: ProjectScreenType;
}

export const Schema: React.FC<SchemaStatePropsType> = ({ projectScreen }) => {
  const isImageExists = useMemo(() => projectScreen.schema_url, [projectScreen.schema_url]);

  const inputElements = [
    {
      id: '1',
      size: { width: 10, height: 3 },
      coords: { x: 0, y: 0 },
      value: 1,
      tag: ''
    }
  ];

  const textElements = [
    {
      id: '1',
      width: 1,
      height: 2,
      coords: [10, 1],
      value: 1
    }
  ];

  const bulbElements = [
    {
      id: '1',
      width: 1,
      height: 2,
      coords: [10, 1],
      value: 1,
      tag: ''
    }
  ];

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
        {isImageExists ? (
          <div className='relative'>
            <img
              className='h-full w-full rounded-3xl object-fill'
              src={projectScreen.schema_url}
              alt='schema'
            />

            {inputElements.map((inputElement) => (
              <InputElement key={inputElement.id} input={inputElement} />
            ))}

            {textElements.map((textElement) => (
              <TextElement key={textElement.id} />
            ))}

            {bulbElements.map((bulbElement) => (
              <BulbElement key={bulbElement.id} />
            ))}
          </div>
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
