import { useNavigate } from 'react-router-dom';

import { Paths } from 'src/routes';
import { Text } from 'src/components/Text';
import { useModal } from 'src/hooks/useModal';
import { Button } from 'src/components/Button';
import { ModalNames } from 'src/constants/modals';

import Translations from './translations';

const menu = [
  {
    title: Translations.home,
    link: '/',
    isActive: true
  },
  {
    title: Translations.pricing,
    link: '/pricing'
  },
  {
    title: Translations.features,
    link: '/features'
  },
  {
    title: Translations.about,
    link: '/about'
  },
  {
    title: Translations.contact,
    link: '/contact'
  }
];

export const Header = () => {
  const modal = useModal();

  const navigate = useNavigate();

  const getItemMenuClass = (item: (typeof menu)[number]) =>
    ['font-josefin', 'text-main-white', item.isActive && 'underline underline-offset-8']
      .filter(Boolean)
      .join(' ');

  const handleOnLogin = () => {
    const auth = sessionStorage.getItem('auth');

    if (auth) {
      const { loggedIn } = JSON.parse(auth);

      if (loggedIn) {
        navigate(Paths.Projects);

        return;
      }
    }

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
    <div className='flex flex-row items-center justify-between'>
      <div className='flex flex-row items-center gap-20'>
        <Text
          as='a'
          variant='header_3'
          href={'/'}
          icon='mechanism'
          iconSize='sm'
          iconPosition='left'
          className='gap-3 font-josefin text-main-skyblue'
        >
          {Translations.logo}
        </Text>

        <div className='flex flex-row items-center gap-10'>
          {menu.map((item, index) => (
            <Text
              key={index}
              as='a'
              variant='base_medium'
              href={item.link}
              className={getItemMenuClass(item)}
            >
              {item.title}
            </Text>
          ))}
        </div>
      </div>

      <Button
        className='text-subtone-skyblue-2 ring-1 ring-subtone-skyblue-2'
        as='button'
        size='md'
        icon='user'
        iconSize='md'
        iconColor='subtone-skyblue-2'
        label={Translations.loginBtn}
        onClick={handleOnLogin}
      />
    </div>
  );
};
