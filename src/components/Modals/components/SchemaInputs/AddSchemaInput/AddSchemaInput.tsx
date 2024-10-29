import React, { useState } from 'react';

import { Text } from 'src/components/Text';
import { Input } from 'src/components/Input';
import { useModal } from 'src/hooks/useModal';
import { Button } from 'src/components/Button';
import { ModalNames } from 'src/constants/modals';
import { Textarea } from 'src/components/Textarea';
import { fetchCreateSchemaInput } from 'src/reducers/schema-inputs';

import Translations from './translations';

interface AddControlSwitchPropsType {
  screenId: string;
  x: number;
  y: number;
}

export const AddSchemaInput: React.FC<AddControlSwitchPropsType> = ({ screenId, x, y }) => {
  const modal = useModal();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [unit, setUnit] = useState('');

  const [tag, setTag] = useState('');

  const handleAddSchemaInput = async () => {
    if (screenId && title && tag) {
      await fetchCreateSchemaInput({
        screen_id: screenId,
        title,
        description,
        value: 0,
        unit,
        tag,
        width: 75,
        height: 25,
        x,
        y
      });

      modal({
        name: ModalNames.AddSchemaInput,
        show: false
      });
    }
  };

  return (
    <div className='flex flex-col items-center overflow-hidden'>
      <Text as='h2' variant='header_2' className='mb-5 font-lato text-main-white'>
        {Translations.addInputHeading}
      </Text>

      <div className='modal-scrollbar flex flex-col items-center gap-5 overflow-y-auto px-10 pb-5'>
        <Input
          className='h-14 w-80 bg-main-white shadow-skyblue ring-0 [&>input]:text-sm'
          labelClassName='text-main-white'
          value={title}
          placeholder={Translations.titlePlaceholder}
          label={Translations.titleLabel}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Textarea
          className='w-80 bg-main-white shadow-skyblue ring-0 [&>textarea]:text-sm'
          labelClassName='text-main-white'
          size='lg'
          value={description}
          placeholder={Translations.descriptionPlaceholder}
          label={Translations.descriptionLabel}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={150}
        />

        <Input
          className='h-14 w-80 bg-main-white shadow-skyblue ring-0 [&>input]:text-sm'
          labelClassName='text-main-white'
          value={unit}
          placeholder={Translations.unitPlaceholder}
          label={Translations.unitLabel}
          onChange={(e) => setUnit(e.target.value)}
        />

        <Input
          className='mb-5 h-14 w-80 bg-main-white shadow-skyblue ring-0 [&>input]:text-sm'
          labelClassName='text-main-white'
          value={tag}
          placeholder={Translations.tagPlaceholder}
          label={Translations.tagLabel}
          onChange={(e) => setTag(e.target.value)}
        />

        <Button
          className='w-64'
          variant='secondary'
          color='skyblue'
          size='md'
          label={Translations.newInputBtn}
          onClick={handleAddSchemaInput}
        />
      </div>
    </div>
  );
};
