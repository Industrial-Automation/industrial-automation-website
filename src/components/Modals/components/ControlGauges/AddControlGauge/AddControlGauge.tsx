import React, { useState } from 'react';

import { Text } from 'src/components/Text';
import { Input } from 'src/components/Input';
import { useModal } from 'src/hooks/useModal';
import { Button } from 'src/components/Button';
import { ModalNames } from 'src/constants/modals';
import { Textarea } from 'src/components/Textarea';
import { Switcher } from 'src/components/Switcher';
import { fetchCreateControlGauge } from 'src/reducers/control-gauges';

import Translations from './translations';

interface AddControlGaugePropsType {
  screenId: string;
}

export const AddControlGauge: React.FC<AddControlGaugePropsType> = ({ screenId }) => {
  const modal = useModal();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [intervalValue, setIntervalValue] = useState(0);

  const [unit, setUnit] = useState('');

  const [tag, setTag] = useState('');

  const [isEditable, setIsEditable] = useState(false);

  const handleAddControlGauge = async () => {
    if (screenId && title && unit && tag) {
      await fetchCreateControlGauge({
        screen_id: screenId,
        title,
        description,
        min_value: minValue,
        max_value: maxValue,
        interval_value: intervalValue,
        unit,
        tag,
        editable: isEditable,
        value: 0
      });

      modal({
        name: ModalNames.AddControlGauge,
        show: false
      });
    }
  };

  return (
    <div className='flex flex-col items-center overflow-hidden'>
      <Text as='h2' variant='header_2' className='mb-5 font-lato text-main-white'>
        {Translations.addGaugeHeading}
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

        <div className='flex w-80 flex-col gap-2'>
          <div className='flex flex-row items-center gap-5'>
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

          <div className='flex flex-row items-center gap-5'>
            <Input
              className='h-8 bg-main-white shadow-skyblue ring-0 [&>input]:text-xs'
              labelClassName='text-main-white'
              type='number'
              value={intervalValue.toString()}
              label={Translations.intervalValueLabel}
              onChange={(e) => setIntervalValue(Number(e.target.value))}
            />

            <Input
              className='h-8 bg-main-white shadow-skyblue ring-0 [&>input]:text-xs'
              labelClassName='text-main-white'
              value={unit}
              label={Translations.unitLabel}
              placeholder={Translations.unitPlaceholder}
              onChange={(e) => setUnit(e.target.value)}
            />
          </div>
        </div>

        <Input
          className='h-14 w-80 bg-main-white shadow-skyblue ring-0 [&>input]:text-sm'
          labelClassName='text-main-white'
          value={tag}
          placeholder={Translations.tagPlaceholder}
          label={Translations.tabLabel}
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
          label={Translations.newGaugeBtn}
          onClick={handleAddControlGauge}
        />
      </div>
    </div>
  );
};
