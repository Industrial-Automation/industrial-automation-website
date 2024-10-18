import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Paths } from 'src/routes';
import { Text } from 'src/components/Text';
import { Input } from 'src/components/Input';
import { useModal } from 'src/hooks/useModal';
import { fetchLogin } from 'src/reducers/auth';
import { Button } from 'src/components/Button';
import { ModalNames } from 'src/constants/modals';
import { Checkbox } from 'src/components/Checkbox';

import Translations from './translations';

export const SignIn: React.FC = () => {
  const modal = useModal();

  const navigate = useNavigate();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [isRemember, setIsRemember] = useState(false);

  const handleOnForgetPassword = () => {
    modal({
      name: ModalNames.SignIn,
      show: false
    });

    modal({
      name: ModalNames.ForgotPassword,
      show: true,
      isOverlay: true,
      frame: {
        type: 'modal',
        props: {}
      },
      variant: {
        type: 'forgotPassword',
        props: {}
      }
    });
  };

  const handleSignUp = () => {
    modal({
      name: ModalNames.SignIn,
      show: false
    });

    modal({
      name: ModalNames.SignUp,
      show: true,
      isOverlay: true,
      frame: {
        type: 'modal',
        props: {}
      },
      variant: {
        type: 'signUp',
        props: {}
      }
    });
  };

  const handleSignIn = async () => {
    if (login && password) {
      const { data } = await fetchLogin({
        email: login,
        password,
        rememberMe: isRemember
      });

      if (data?.user?.id) {
        modal({
          name: ModalNames.SignIn,
          show: false
        });

        navigate(Paths.Projects);
      }
    }
  };

  return (
    <div className='flex flex-col items-center px-10 pb-5'>
      <Text as='h2' variant='header_2' className='mb-5 font-lato text-main-white'>
        {Translations.signInHeading}
      </Text>

      <Input
        className='mb-5 h-14 w-80 bg-main-white shadow-skyblue ring-0 [&>input]:text-sm'
        labelClassName='text-main-white'
        label={Translations.loginLabel}
        value={login}
        placeholder={Translations.loginPlaceholder}
        onChange={(e) => setLogin(e.target.value)}
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

      <div className='mb-7 flex w-80 justify-between'>
        <Checkbox
          id='remember'
          className='text-main-white'
          label={Translations.rememberLabel}
          checked={isRemember}
          color='midnight'
          checkmarkColor='white'
          onChange={() => setIsRemember(!isRemember)}
        />

        <Button
          as='a'
          className='text-main-white underline underline-offset-4'
          variant='secondary'
          label={Translations.forgotPassword}
          onClick={handleOnForgetPassword}
        />
      </div>

      <Button
        className='mb-4 w-64'
        variant='secondary'
        color='skyblue'
        size='md'
        label={Translations.signInBtn}
        onClick={handleSignIn}
      />

      <Button
        className='w-64'
        variant='secondary'
        color='skyblue'
        size='md'
        label={Translations.newAccountBtn}
        onClick={handleSignUp}
      />
    </div>
  );
};
