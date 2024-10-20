import React, { useState } from 'react';

import { Text } from 'src/components/Text';
import { Input } from 'src/components/Input';
import { useModal } from 'src/hooks/useModal';
import { Button } from 'src/components/Button';
import { ModalNames } from 'src/constants/modals';

import Translations from './translations';

export const ForgotPassword: React.FC = () => {
  const modal = useModal();

  const [login, setLogin] = useState('');

  const handleOnResetPassword = () => {
    modal({
      name: ModalNames.ForgotPassword,
      show: false
    });

    modal({
      name: ModalNames.ConfirmCode,
      show: true,
      isOverlay: true,
      frame: {
        type: 'modal',
        props: {}
      },
      variant: {
        type: 'confirmCode',
        props: {}
      }
    });
  };

  return (
    <div className='mb-2 flex flex-col items-center px-10 pb-5'>
      <Text as='h2' variant='header_2' className='mb-5 font-lato text-main-white'>
        {Translations.forgotPasswordHeading}
      </Text>

      <Text as='p' variant='sm_medium' className='mb-5 font-lato text-main-white'>
        {Translations.forgotPasswordText}
      </Text>

      <Input
        className='mb-10 h-14 w-80 bg-main-white shadow-skyblue ring-0 [&>input]:text-sm'
        labelClassName='text-main-white'
        label={Translations.loginLabel}
        value={login}
        placeholder={Translations.loginPlaceholder}
        onChange={(e) => setLogin(e.target.value)}
      />

      <Button
        className='w-64'
        variant='secondary'
        color='skyblue'
        size='md'
        label={Translations.resetPasswordBtn}
        onClick={handleOnResetPassword}
      />
    </div>
  );
};
