import React, { useState } from 'react';

import { Text } from 'src/components/Text';
import { Input } from 'src/components/Input';
import { useModal } from 'src/hooks/useModal';
import { Button } from 'src/components/Button';
import { ModalNames } from 'src/constants/modals';
import { Textarea } from 'src/components/Textarea';
import { Switcher } from 'src/components/Switcher';
import { fetchUpdateControlGauge } from 'src/reducers/control-gauges';

import Translations from './translations';

interface UpdateControlGaugePropsType {
  id: string;
  title: string;
  description: string;
  min_value: number;
  max_value: number;
  interval_value: number;
  unit: string;
  editable: boolean;
}

export const UpdateControlGauge: React.FC<UpdateControlGaugePropsType> = (controlGauge) => {
  const modal = useModal();

  const [title, setTitle] = useState(controlGauge.title);
  const [description, setDescription] = useState(controlGauge.description);

  const [minValue, setMinValue] = useState(controlGauge.min_value);
  const [maxValue, setMaxValue] = useState(controlGauge.max_value);
  const [intervalValue, setIntervalValue] = useState(controlGauge.interval_value);

  const [unit, setUnit] = useState(controlGauge.unit);

  const [isEditable, setIsEditable] = useState(controlGauge.editable);

  const handleUpdateControlGauge = async () => {
    if (controlGauge.id && title && unit) {
      await fetchUpdateControlGauge(controlGauge.id, {
        title,
        description,
        min_value: minValue,
        max_value: maxValue,
        interval_value: intervalValue,
        unit,
        editable: isEditable
      });

      modal({
        name: ModalNames.UpdateControlGauge,
        show: false
      });
    }
  };

  return (
    <div className='modal-scrollbar flex flex-col items-center gap-5 overflow-auto px-10 pb-5'>
      <Text as='h2' variant='header_2' className='mb-5 font-lato text-main-white'>
        {Translations.editGaugeHeading}
      </Text>

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
        label={Translations.updatedGaugeBtn}
        onClick={handleUpdateControlGauge}
      />
    </div>
  );
};
