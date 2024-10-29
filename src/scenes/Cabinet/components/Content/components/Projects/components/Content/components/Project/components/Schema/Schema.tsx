import { useSelector } from 'react-redux';
import React, { useEffect, useMemo, useRef } from 'react';

import { useModal } from 'src/hooks/useModal';
import { Button } from 'src/components/Button';
import { Upload } from 'src/components/Upload';
import { ModalNames } from 'src/constants/modals';
import { fetchGetSchemaInputs, SchemaInputsStateType } from 'src/reducers/schema-inputs';
import { fetchUploadProjectScreen, ProjectScreenType } from 'src/reducers/project-screens';

import { BulbElement } from './components/BulbElement';
import { InputElement } from './components/InputElement';

import Translations from './translations';

interface SchemaStatePropsType {
  projectScreen: ProjectScreenType;
}

export const Schema: React.FC<SchemaStatePropsType> = ({ projectScreen }) => {
  const { schema_inputs } = useSelector<any>(
    (state) => state.schema_inputs
  ) as SchemaInputsStateType;

  const imageRef = useRef(null);

  const modal = useModal();

  const isImageExists = useMemo(() => projectScreen.schema_url, [projectScreen.schema_url]);

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

  const handleAddSchemaInput = () => {
    if (projectScreen.id && projectScreen.schema_url && imageRef && imageRef.current) {
      const imageElement = imageRef.current as HTMLImageElement;

      modal({
        name: ModalNames.AddSchemaInput,
        show: true,
        isOverlay: true,
        frame: {
          type: 'modal',
          props: {}
        },
        variant: {
          type: 'addSchemaInput',
          props: {
            screenId: projectScreen.id,
            x: imageElement.offsetLeft + imageElement.offsetWidth / 2,
            y: imageElement.offsetTop + imageElement.offsetHeight / 2
          }
        }
      });
    }
  };

  useEffect(() => {
    if (!schema_inputs.length && projectScreen.id) {
      fetchGetSchemaInputs(projectScreen.id);
    }
  }, [projectScreen.id, schema_inputs.length]);

  return (
    <div className='flex h-full w-full flex-col items-center overflow-hidden'>
      <div className='mb-5 h-full w-full overflow-hidden px-14'>
        {isImageExists ? (
          <div className='relative'>
            <img
              ref={imageRef}
              className='h-full w-full rounded-3xl object-fill'
              src={projectScreen.schema_url}
              alt='schema'
            />

            {schema_inputs.map((inputElement) => (
              <InputElement key={inputElement.id} input={inputElement} />
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
        <Button icon='input' iconSize='xs' iconColor='white' onClick={handleAddSchemaInput} />

        <Button icon='bulb' iconSize='xs' iconColor='white' onClick={() => {}} />
      </div>
    </div>
  );
};
