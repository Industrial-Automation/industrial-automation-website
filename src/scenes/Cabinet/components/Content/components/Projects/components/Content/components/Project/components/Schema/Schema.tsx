import { useSelector } from 'react-redux';
import React, { useEffect, useMemo, useRef } from 'react';

import {
  fetchGetSchemaBulbs,
  fetchUpdateSchemaBulb,
  SchemaBulbsStateType
} from 'src/reducers/schema-bulbs';
import {
  fetchGetSchemaInputs,
  fetchUpdateSchemaInput,
  SchemaInputsStateType
} from 'src/reducers/schema-inputs';
import { debounce } from 'src/utils';
import { useModal } from 'src/hooks/useModal';
import { Button } from 'src/components/Button';
import { Upload } from 'src/components/Upload';
import { ModalNames } from 'src/constants/modals';
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

  const { schema_bulbs } = useSelector<any>((state) => state.schema_bulbs) as SchemaBulbsStateType;

  const imageRef = useRef(null);

  const modal = useModal();

  const isImageExists = useMemo(() => projectScreen.schema_url, [projectScreen.schema_url]);

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

  const handleUpdateSchemaInput = useMemo(
    () => debounce((id, data) => fetchUpdateSchemaInput(id, data), 800),
    []
  );

  const handleAddSchemaBulb = () => {
    if (projectScreen.id && projectScreen.schema_url && imageRef && imageRef.current) {
      const imageElement = imageRef.current as HTMLImageElement;

      modal({
        name: ModalNames.AddSchemaBulb,
        show: true,
        isOverlay: true,
        frame: {
          type: 'modal',
          props: {}
        },
        variant: {
          type: 'addSchemaBulb',
          props: {
            screenId: projectScreen.id,
            x: imageElement.offsetLeft + imageElement.offsetWidth / 2,
            y: imageElement.offsetTop + imageElement.offsetHeight / 2
          }
        }
      });
    }
  };

  const handleUpdateSchemaBulb = useMemo(
    () => debounce((id, data) => fetchUpdateSchemaBulb(id, data), 800),
    []
  );

  useEffect(() => {
    const fetchSchemaData = async () => {
      await fetchGetSchemaInputs(projectScreen.id);

      await fetchGetSchemaBulbs(projectScreen.id);
    };

    fetchSchemaData();

    const intervalId = setInterval(fetchSchemaData, 3000);

    return () => clearInterval(intervalId);
  }, [projectScreen.id]);

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
              <InputElement
                key={inputElement.last_updated_at}
                input={inputElement}
                onChange={handleUpdateSchemaInput}
              />
            ))}

            {schema_bulbs.map((bulbElement) => (
              <BulbElement
                key={bulbElement.last_updated_at}
                bulb={bulbElement}
                onChange={handleUpdateSchemaBulb}
              />
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

        <Button icon='bulb' iconSize='xs' iconColor='white' onClick={handleAddSchemaBulb} />
      </div>
    </div>
  );
};
