import React, { useState } from 'react';

import { Text } from 'src/components/Text';
import { Input } from 'src/components/Input';
import { Button } from 'src/components/Button';

import Translations from './translations';

export const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [newConfirmedPassword, setNewConfirmedPassword] = useState('');

  return (
    <div className='mb-2 flex flex-col items-center px-10 pb-5'>
      <Text as='h2' variant='header_2' className='mb-5 font-lato text-main-white'>
        {Translations.resetPasswordHeading}
      </Text>

      <Input
        className='mb-5 h-14 w-80 bg-main-white shadow-skyblue ring-0 [&>input]:text-sm'
        labelClassName='text-main-white'
        type='password'
        label={Translations.newPasswordLabel}
        value={newPassword}
        placeholder={Translations.newPasswordPlaceholder}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <Input
        className='mb-7 h-14 w-80 bg-main-white shadow-skyblue ring-0 [&>input]:text-sm'
        labelClassName='text-main-white'
        type='password'
        label={Translations.confirmPasswordLabel}
        value={newConfirmedPassword}
        placeholder={Translations.confirmPasswordPlaceholder}
        onChange={(e) => setNewConfirmedPassword(e.target.value)}
      />

      <Button
        className='w-64'
        variant='secondary'
        color='skyblue'
        size='md'
        label={Translations.resetPasswordBtn}
        onClick={() => {}}
      />
    </div>
  );
};
