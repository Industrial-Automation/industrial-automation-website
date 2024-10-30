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
  warning_min_value: number | null;
  warning_max_value: number | null;
  critical_min_value: number | null;
  critical_max_value: number | null;
  unit: string;
  tag: string;
  callback: () => void;
}

export const SchemaBulbMenu: React.FC<SchemaBulbMenuPropsType> = (schemaBulb) => {
  const [title, setTitle] = useState(schemaBulb.title);
  const [description, setDescription] = useState(schemaBulb.description);

  const [warningMinValue, setWarningMinValue] = useState<number | null>(
    schemaBulb.warning_min_value
  );
  const [warningMaxValue, setWarningMaxValue] = useState<number | null>(
    schemaBulb.warning_max_value
  );

  const [criticalMinValue, setCriticalMinValue] = useState<number | null>(
    schemaBulb.critical_min_value
  );
  const [criticalMaxValue, setCriticalMaxValue] = useState<number | null>(
    schemaBulb.critical_max_value
  );

  const [unit, setUnit] = useState(schemaBulb.unit);

  const [tag, setTag] = useState(schemaBulb.tag);

  const handleUpdateSchemaBulb = async () => {
    if (schemaBulb.id && title && unit && tag) {
      await fetchUpdateSchemaBulb(schemaBulb.id, {
        title,
        description,
        warning_min_value: warningMinValue,
        warning_max_value: warningMaxValue,
        critical_min_value: criticalMinValue,
        critical_max_value: criticalMaxValue,
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

        <Input
          className='h-8 w-44 bg-main-white shadow-skyblue ring-0 [&>input]:text-xs'
          labelClassName='text-main-white'
          type='number'
          placeholder={Translations.warningMinValuePlaceholder}
          value={warningMinValue?.toString()}
          label={Translations.warningMinValueLabel}
          onChange={(e) => setWarningMinValue(Number(e.target.value))}
        />

        <Input
          className='h-8 w-44 bg-main-white shadow-skyblue ring-0 [&>input]:text-xs'
          labelClassName='text-main-white'
          type='number'
          placeholder={Translations.warningMaxValuePlaceholder}
          value={warningMaxValue?.toString()}
          label={Translations.warningMaxValueLabel}
          onChange={(e) => setWarningMaxValue(Number(e.target.value))}
        />

        <Input
          className='h-8 w-44 bg-main-white shadow-skyblue ring-0 [&>input]:text-xs'
          labelClassName='text-main-white'
          type='number'
          placeholder={Translations.criticalMinValuePlaceholder}
          value={criticalMinValue?.toString()}
          label={Translations.criticalMinValueLabel}
          onChange={(e) => setCriticalMinValue(Number(e.target.value))}
        />

        <Input
          className='h-8 w-44 bg-main-white shadow-skyblue ring-0 [&>input]:text-xs'
          labelClassName='text-main-white'
          type='number'
          placeholder={Translations.criticalMaxValuePlaceholder}
          value={criticalMaxValue?.toString()}
          label={Translations.criticalMaxValueLabel}
          onChange={(e) => setCriticalMaxValue(Number(e.target.value))}
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
