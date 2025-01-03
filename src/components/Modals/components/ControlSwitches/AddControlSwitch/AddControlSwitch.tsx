import React, { useState } from 'react';

import { Text } from 'src/components/Text';
import { Input } from 'src/components/Input';
import { useModal } from 'src/hooks/useModal';
import { Button } from 'src/components/Button';
import { ModalNames } from 'src/constants/modals';
import { Textarea } from 'src/components/Textarea';
import { Switcher } from 'src/components/Switcher';
import { fetchCreateControlSwitch } from 'src/reducers/control-switches';

import Translations from './translations';

interface AddControlSwitchPropsType {
  screenId: string;
}

export const AddControlSwitch: React.FC<AddControlSwitchPropsType> = ({ screenId }) => {
  const modal = useModal();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [tag, setTag] = useState('');

  const [isEditable, setIsEditable] = useState(false);

  const handleAddControlSwitch = async () => {
    if (screenId && title && tag) {
      await fetchCreateControlSwitch({
        screen_id: screenId,
        title,
        description,
        tag,
        editable: isEditable,
        value: false
      });

      modal({
        name: ModalNames.AddControlSwitch,
        show: false
      });
    }
  };

  return (
    <div className='flex flex-col items-center overflow-hidden'>
      <Text as='h2' variant='header_2' className='mb-5 font-lato text-main-white'>
        {Translations.addSwitchHeading}
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
          value={tag}
          placeholder={Translations.tagPlaceholder}
          label={Translations.tagLabel}
          onChange={(e) => setTag(e.target.value)}
        />

        <Switcher
          containerClassName='w-80 mb-5'
          labelClassName='text-main-white'
          size='sm'
          barColor='gray'
          checkedBarColor='skyblue'
          circleColor='white'
          value={isEditable}
          label={Translations.editableLabel}
          onChange={(isChecked) => setIsEditable(isChecked)}
        />

        <Button
          className='w-64'
          variant='secondary'
          color='skyblue'
          size='md'
          label={Translations.newSwitchBtn}
          onClick={handleAddControlSwitch}
        />
      </div>
    </div>
  );
};
