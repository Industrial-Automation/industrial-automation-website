import React, { useState } from 'react';

import { Text } from 'src/components/Text';
import { Input } from 'src/components/Input';
import { Button } from 'src/components/Button';
import { Textarea } from 'src/components/Textarea';
import { fetchDeleteSchemaInput, fetchUpdateSchemaInput } from 'src/reducers/schema-inputs';

import Translations from './translations';

interface SchemaInputMenuPropsType {
  id: string;
  title: string;
  description: string;
  unit: string;
  tag: string;
  callback: () => void;
}

export const SchemaInputMenu: React.FC<SchemaInputMenuPropsType> = (schemaInput) => {
  const [title, setTitle] = useState(schemaInput.title);
  const [description, setDescription] = useState(schemaInput.description);

  const [unit, setUnit] = useState(schemaInput.unit);

  const [tag, setTag] = useState(schemaInput.tag);

  const handleUpdateSchemaInput = async () => {
    if (schemaInput.id && title && unit && tag) {
      await fetchUpdateSchemaInput(schemaInput.id, { title, description, unit, tag });

      schemaInput.callback();
    }
  };

  const handleDeleteSchemaInput = async () => {
    if (schemaInput.id) {
      await fetchDeleteSchemaInput(schemaInput.id);

      schemaInput.callback();
    }
  };

  return (
    <div
      id='schema-input-menu'
      className='flex w-full flex-col items-center overflow-hidden pb-3 pr-2'
    >
      <Text as='h3' variant='header_3' className='my-2 font-lato text-main-white'>
        {Translations.inputHeading}
      </Text>

      <div className='modal-scrollbar flex w-full flex-col items-center gap-3 overflow-y-auto'>
        <Input
          className='h-8 w-44 bg-main-white shadow-skyblue ring-0 [&>input]:text-xs'
          labelClassName='text-main-white'
          value={title}
          placeholder={Translations.titlePlaceholder}
          label={Translations.titleLabel}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Textarea
          className='w-44 bg-main-white shadow-skyblue ring-0 [&>textarea]:text-xs'
          labelClassName='text-main-white'
          size='lg'
          value={description}
          placeholder={Translations.descriptionPlaceholder}
          label={Translations.descriptionLabel}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={150}
        />

        <Input
          className='h-8 w-44 bg-main-white shadow-skyblue ring-0 [&>input]:text-xs'
          labelClassName='text-main-white'
          value={unit}
          placeholder={Translations.unitPlaceholder}
          label={Translations.unitLabel}
          onChange={(e) => setUnit(e.target.value)}
        />

        <Input
          className='mb-5 h-8 w-44 bg-main-white shadow-skyblue ring-0 [&>input]:text-xs'
          labelClassName='text-main-white'
          value={tag}
          placeholder={Translations.tagPlaceholder}
          label={Translations.tagLabel}
          onChange={(e) => setTag(e.target.value)}
        />

        <div className='flex w-44 flex-row items-center justify-between'>
          <Button
            className='w-20'
            variant='primary'
            color='skyblue'
            size='sm'
            label={Translations.saveBtn}
            onClick={handleUpdateSchemaInput}
          />

          <Button
            className='w-20'
            variant='primary'
            color='red'
            size='sm'
            label={Translations.deleteBtn}
            onClick={handleDeleteSchemaInput}
          />
        </div>
      </div>
    </div>
  );
};
