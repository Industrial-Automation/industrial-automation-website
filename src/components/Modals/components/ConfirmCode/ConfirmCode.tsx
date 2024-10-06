import React, { KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';

import { Text } from 'src/components/Text';
import { useModal } from 'src/hooks/useModal';
import { Button } from 'src/components/Button';
import { ModalNames } from 'src/constants/modals';

import Translations from './translations';

const timerSecondsLimit = 60;

export const ConfirmCode: React.FC = () => {
  const modal = useModal();

  const codeInputRefs = [
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null)
  ];

  const [codeValues, setCodeValues] = useState(['', '', '', '']);
  const [timerSeconds, setTimerSeconds] = useState(timerSecondsLimit);

  const inputStyle = useMemo(
    () =>
      [
        'h-14',
        'w-16',
        'rounded-xl',
        'shadow-skyblue',
        'ring-0',
        'text-center',
        'text-4xl',
        'border-0',
        'outline-0',
        'focus:outline-none'
      ].join(' '),
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSeconds((prevState) => (prevState === 1 ? timerSecondsLimit : prevState - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChangeCode = (index: number, value: string) => {
    if ((Number.isNaN(value) && value !== '') || value.length > 1) {
      return;
    }

    const newValues = [...codeValues];
    newValues[index] = value;

    const inputRef = codeInputRefs[index + 1];

    if (inputRef) {
      inputRef.current?.focus();
    }

    setCodeValues(newValues);
  };

  const handleBackspace = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    e.preventDefault();

    const newValues = [...codeValues];

    const inputRef = codeInputRefs[index - 1];

    if (inputRef && index > 0 && codeValues[index] !== '') {
      inputRef.current?.focus();
    }

    newValues[index] = '';

    setCodeValues(newValues);
  };

  const handleResendCode = () => {
    setTimerSeconds(timerSecondsLimit);
  };

  const handleOnEnterCode = () => {
    modal({
      name: ModalNames.ConfirmCode,
      show: false
    });

    modal({
      name: ModalNames.ResetPassword,
      show: true,
      isOverlay: true,
      frame: {
        type: 'modal',
        props: {}
      },
      variant: {
        type: 'resetPassword',
        props: {}
      }
    });
  };

  return (
    <div className='flex flex-col items-center px-10 pb-5'>
      <Text as='h2' variant='header_2' className='mb-5 font-lato text-main-white'>
        {Translations.confirmCodeHeading}
      </Text>

      <Text as='p' className='mb-10 font-lato text-main-white'>
        {Translations.confirmCodeText}
      </Text>

      <div className='mb-10 flex justify-between gap-4'>
        {codeValues.map((value, index) => (
          <input
            ref={codeInputRefs[index]}
            key={index}
            className={inputStyle}
            value={value}
            maxLength={1}
            onChange={(e) => handleChangeCode(index, e.target.value)}
            onKeyDown={(e) => e.key === 'Backspace' && handleBackspace(e, index)}
          />
        ))}
      </div>

      <Button
        className='mb-10 w-64'
        variant='secondary'
        color='skyblue'
        size='md'
        label={Translations.enterCodeBtn}
        onClick={handleOnEnterCode}
      />

      <Text as='p' className='mb-4 font-lato text-main-white'>
        {`${timerSeconds} ${Translations.timerText}`}
      </Text>

      <Button
        as='a'
        className='tracking-wider text-main-gray underline underline-offset-4'
        variant='secondary'
        label={Translations.resendBtn}
        onClick={handleResendCode}
      />
    </div>
  );
};
