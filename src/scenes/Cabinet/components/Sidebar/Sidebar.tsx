import { Text, TextType } from 'src/components/Text';

import Translations from './translations';

import Avatar from 'src/assets/images/avatar.png';

const mainMenu = [
  {
    title: Translations.profile,
    icon: 'profile',
    link: '/profile'
  },
  {
    title: Translations.projects,
    icon: 'folder',
    link: '/projects'
  },
  {
    title: Translations.security,
    icon: 'security',
    link: '/security'
  },
  {
    title: Translations.settings,
    icon: 'settings',
    link: '/projects'
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
  const activeLink = '/profile';

  const getMenuItemClass = (menuItem: (typeof mainMenu | typeof additionalMenu)[number]) =>
    [
      'gap-3',
      'rounded-lg',
      'px-2',
      'py-3',
      'font-lato',
      'text-main-white',
      'hover:bg-subtone-skyblue-1',
      activeLink === menuItem.link && 'bg-subtone-skyblue-1'
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
        <img className='h-8 w-8 object-cover' src={Avatar} alt='avatar' />

        <div className='flex flex-col gap-1 pt-0.5'>
          <Text as='p' variant='sm_bold' className='font-lato text-main-skyblue'>
            Test Testik
          </Text>

          <Text as='p' variant='xs_bold' className='font-lato text-main-white'>
            test.testovich.eng2024@gmail.com
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
