import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Paths } from 'src/routes';
import { trimUrl } from 'src/utils';
import { Icons } from 'src/components/Icons';
import { AuthStateType } from 'src/reducers/auth';
import { Text, TextType } from 'src/components/Text';

import Translations from './translations';

const mainMenu = [
  {
    title: Translations.profile,
    icon: 'profile',
    link: Paths.Profile
  },
  {
    title: Translations.projects,
    icon: 'folder',
    link: Paths.Projects
  },
  {
    title: Translations.security,
    icon: 'security',
    link: Paths.Security
  },
  {
    title: Translations.settings,
    icon: 'settings',
    link: Paths.Settings
  }
];

const additionalMenu = [
  {
    title: Translations.help,
    icon: 'help',
    link: '/help'
  },
  {
    title: Translations.signOut,
    icon: 'exit',
    link: '/sign-out'
  }
];

export const Sidebar = () => {
  const { user } = useSelector<any>((state) => state.auth) as AuthStateType;

  const location = useLocation();

  const getMenuItemClass = (menuItem: (typeof mainMenu | typeof additionalMenu)[number]) =>
    [
      'gap-3',
      'rounded-lg',
      'px-2',
      'py-3',
      'font-lato',
      'text-main-white',
      'hover:bg-subtone-skyblue-1',
      trimUrl(location.pathname, 2) === menuItem.link && 'bg-subtone-skyblue-1'
    ]
      .filter(Boolean)
      .join(' ');

  return (
    <div className='flex w-80 flex-col'>
      <Text
        as='a'
        align='center'
        variant='header_2'
        href='/'
        className='mb-5 mt-2 text-center font-josefin text-main-white'
      >
        {Translations.title}
      </Text>

      <div className='mb-10 mt-3 flex flex-row items-center gap-2 rounded-lg p-2 ring-1 ring-main-white'>
        <Icons variant='profile_card' size='md' color='white' />

        <div className='flex flex-col pt-0.5'>
          <Text as='p' variant='sm_bold' className='font-lato text-main-skyblue'>
            {`${user?.first_name || ''} ${user?.last_name || ''}`}
          </Text>

          <Text as='p' variant='xs_bold' className='font-lato text-main-white'>
            {`${user?.email || ''}`}
          </Text>
        </div>
      </div>

      <div className='flex flex-1 flex-col justify-between'>
        <div className='flex flex-col gap-2'>
          {mainMenu.map((item, index) => (
            <Text
              key={index}
              as='a'
              align='right'
              variant='sm_medium'
              href={item.link}
              icon={item.icon as TextType['icon']}
              iconSize='sm'
              iconPosition='left'
              iconColor='white'
              className={getMenuItemClass(item)}
            >
              {item.title}
            </Text>
          ))}
        </div>

        <div className='flex flex-col gap-2'>
          {additionalMenu.map((item, index) => (
            <Text
              key={index}
              as='a'
              align='right'
              variant='sm_medium'
              href={item.link}
              icon={item.icon as TextType['icon']}
              iconSize='sm'
              iconPosition='left'
              iconColor='white'
              className={getMenuItemClass(item)}
            >
              {item.title}
            </Text>
          ))}
        </div>
      </div>
    </div>
  );
};
