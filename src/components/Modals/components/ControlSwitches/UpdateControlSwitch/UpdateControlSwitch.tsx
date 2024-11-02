import React, { useState } from 'react';

import { Text } from 'src/components/Text';
import { Input } from 'src/components/Input';
import { useModal } from 'src/hooks/useModal';
import { Button } from 'src/components/Button';
import { ModalNames } from 'src/constants/modals';
import { Textarea } from 'src/components/Textarea';
import { Switcher } from 'src/components/Switcher';
import { fetchUpdateControlSwitch } from 'src/reducers/control-switches';

import Translations from './translations';

interface UpdateControlSwitchPropsType {
  id: string;
  title: string;
  description: string;
  tag: string;
  editable: boolean;
}

export const UpdateControlSwitch: React.FC<UpdateControlSwitchPropsType> = (controlSwitch) => {
  const modal = useModal();

  const [title, setTitle] = useState(controlSwitch.title);
  const [description, setDescription] = useState(controlSwitch.description);

  const [tag, setTag] = useState(controlSwitch.tag);

  const [isEditable, setIsEditable] = useState(controlSwitch.editable);

  const handleUpdateControlSwitch = async () => {
    if (controlSwitch.id && title && tag) {
      await fetchUpdateControlSwitch(controlSwitch.id, {
        title,
        description,
        tag,
        editable: isEditable
      });

      modal({
        name: ModalNames.UpdateControlSwitch,
        show: false
      });
    }
  };

  return (
    <div className='flex flex-col items-center overflow-hidden'>
      <Text as='h2' variant='header_2' className='mb-5 font-lato text-main-white'>
        {Translations.updatedSwitchBtn}
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
          label={Translations.updatedSwitchBtn}
          onClick={handleUpdateControlSwitch}
        />
      </div>
    </div>
  );
};
