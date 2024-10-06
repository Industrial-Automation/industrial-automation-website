import React, { useState } from 'react';

import { Text } from 'src/components/Text';
import { Input } from 'src/components/Input';
import { useModal } from 'src/hooks/useModal';
import { Button } from 'src/components/Button';
import { ModalNames } from 'src/constants/modals';
import { Checkbox } from 'src/components/Checkbox';

import Translations from './translations';

export const SignUp: React.FC = () => {
  const modal = useModal();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');

  const [isAcceptTerms, setIsAcceptTerms] = useState(false);

  const handleSignIn = () => {
    modal({
      name: ModalNames.SignUp,
      show: false
    });

    modal({
      name: ModalNames.SignIn,
      show: true,
      isOverlay: true,
      frame: {
        type: 'modal',
        props: {}
      },
      variant: {
        type: 'signIn',
        props: {}
      }
    });
  };

  return (
    <div className='flex flex-col items-center overflow-hidden'>
      <Text as='h2' variant='header_2' className='mb-5 font-lato text-main-white'>
        {Translations.signUpHeading}
      </Text>

      <div className='modal-scrollbar flex flex-col items-center overflow-y-auto px-10 pb-5'>
        <Input
          className='mb-5 h-14 w-80 bg-main-white shadow-skyblue ring-0 [&>input]:text-sm'
          labelClassName='text-main-white'
          label={Translations.firstNameLabel}
          value={firstName}
          placeholder={Translations.firstNamePlaceholder}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <Input
          className='mb-5 h-14 w-80 bg-main-white shadow-skyblue ring-0 [&>input]:text-sm'
          labelClassName='text-main-white'
          label={Translations.lastNameLabel}
          value={lastName}
          placeholder={Translations.lastNamePlaceholder}
          onChange={(e) => setLastName(e.target.value)}
        />

        <Input
          className='mb-5 h-14 w-80 bg-main-white shadow-skyblue ring-0 [&>input]:text-sm'
          labelClassName='text-main-white'
          label={Translations.phoneLabel}
          value={phone}
          placeholder={Translations.phonePlaceholder}
          onChange={(e) => setPhone(e.target.value)}
        />

        <Input
          className='mb-5 h-14 w-80 bg-main-white shadow-skyblue ring-0 [&>input]:text-sm'
          labelClassName='text-main-white'
          label={Translations.emailLabel}
          value={email}
          placeholder={Translations.emailPlaceholder}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          className='mb-5 h-14 w-80 bg-main-white shadow-skyblue ring-0 [&>input]:text-sm'
          labelClassName='text-main-white'
          type='password'
          label={Translations.passwordLabel}
          value={password}
          placeholder={Translations.passwordPlaceholder}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Input
          className='mb-5 h-14 w-80 bg-main-white shadow-skyblue ring-0 [&>input]:text-sm'
          labelClassName='text-main-white'
          type='password'
          label={Translations.confirmPasswordLabel}
          value={confirmedPassword}
          placeholder={Translations.confirmPasswordPlaceholder}
          onChange={(e) => setConfirmedPassword(e.target.value)}
        />

        <Checkbox
          id='accept'
          className='mb-5 text-main-white'
          label={Translations.acceptTermsLabel}
          checked={isAcceptTerms}
          checkmarkColor='white'
          color='midnight'
          onChange={() => setIsAcceptTerms(!isAcceptTerms)}
        />

        <Button
          className='mb-4 w-64'
          variant='secondary'
          color='skyblue'
          size='md'
          label={Translations.signUpBtn}
          onClick={() => {}}
        />

        <Button
          className='mb-5 w-64'
          variant='secondary'
          color='skyblue'
          size='md'
          label={Translations.signInBtn}
          onClick={handleSignIn}
        />
      </div>
    </div>
  );
};
