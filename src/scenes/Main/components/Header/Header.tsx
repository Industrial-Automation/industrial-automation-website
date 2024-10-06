import { Text } from 'src/components/Text';
import { useModal } from 'src/hooks/useModal';
import { Button } from 'src/components/Button';
import { ModalNames } from 'src/constants/modals';

import Translations from './translations';

const menu = [
  {
    title: Translations.home,
    link: '/'
  },
  {
    title: Translations.pricing,
    link: '/'
  },
  {
    title: Translations.features,
    link: '/'
  },
  {
    title: Translations.about,
    link: '/'
  },
  {
    title: Translations.contact,
    link: '/'
  }
];

export const Header = () => {
  const modal = useModal();

  const handleOnLogin = () => {
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
      <div className='flex flex-row items-center gap-10'>
        {menu.map((item, index) => (
          <Text
            key={index}
            as='a'
            variant='base_medium'
            href={item.link}
            className='font-josefin text-main-white'
          >
            {item.title}
          </Text>
        ))}
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
