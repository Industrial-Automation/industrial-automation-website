import React, { useState } from 'react';

import { Text } from 'src/components/Text';
import { Input } from 'src/components/Input';
import { Button } from 'src/components/Button';
import { Textarea } from 'src/components/Textarea';
import { fetchDeleteSchemaBulb, fetchUpdateSchemaBulb } from 'src/reducers/schema-bulbs';

import Translations from './translations';

interface SchemaBulbMenuPropsType {
  id: string;
  title: string;
  description: string;
  min_value: number;
  max_value: number;
  unit: string;
  tag: string;
  callback: () => void;
}

export const SchemaBulbMenu: React.FC<SchemaBulbMenuPropsType> = (schemaBulb) => {
  const [title, setTitle] = useState(schemaBulb.title);
  const [description, setDescription] = useState(schemaBulb.description);

  const [minValue, setMinValue] = useState(schemaBulb.min_value);
  const [maxValue, setMaxValue] = useState(schemaBulb.max_value);

  const [unit, setUnit] = useState(schemaBulb.unit);

  const [tag, setTag] = useState(schemaBulb.tag);

  const handleUpdateSchemaBulb = async () => {
    if (schemaBulb.id && title && unit && tag) {
      await fetchUpdateSchemaBulb(schemaBulb.id, {
        title,
        description,
        min_value: minValue,
        max_value: maxValue,
        unit,
        tag
      });

      schemaBulb.callback();
    }
  };

  const handleDeleteSchemaBulb = async () => {
    if (schemaBulb.id) {
      await fetchDeleteSchemaBulb(schemaBulb.id);

      schemaBulb.callback();
    }
  };

  return (
    <div
      id='schema-bulb-menu'
      className='flex w-full flex-col items-center overflow-hidden pb-3 pr-2'
    >
      <Text as='h3' variant='header_3' className='my-2 font-lato text-main-white'>
        {Translations.bulbHeading}
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

        <div className='flex w-44 flex-row items-center gap-5'>
          <Input
            className='h-8 bg-main-white shadow-skyblue ring-0 [&>input]:text-xs'
            labelClassName='text-main-white'
            type='number'
            value={minValue.toString()}
            label={Translations.minValueLabel}
            onChange={(e) => setMinValue(Number(e.target.value))}
          />

          <Input
            className='h-8 bg-main-white shadow-skyblue ring-0 [&>input]:text-xs'
            labelClassName='text-main-white'
            type='number'
            value={maxValue.toString()}
            label={Translations.maxValueLabel}
            onChange={(e) => setMaxValue(Number(e.target.value))}
          />
        </div>

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
            onClick={handleUpdateSchemaBulb}
          />

          <Button
            className='w-20'
            variant='primary'
            color='red'
            size='sm'
            label={Translations.deleteBtn}
            onClick={handleDeleteSchemaBulb}
          />
        </div>
      </div>
    </div>
  );
};
