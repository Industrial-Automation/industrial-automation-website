import { Text, TextType } from 'src/components/Text';

import Translations from './translations';

const menu = [
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
  },
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
  return (
    <div className='flex w-72 flex-col ring-1 ring-main-skyblue'>
      <div className='my-5'>
        <Text
          as='a'
          align='center'
          variant='header_2'
          href='/'
          className='mb-10 text-center font-josefin text-main-white'
        >
          {Translations.title}
        </Text>

        <Text
          as='p'
          align='center'
          variant='base_medium'
          className='mb-5 text-center font-lato text-main-skyblue'
        >
          Test Testik
        </Text>

        <Text
          as='p'
          align='center'
          variant='base_medium'
          className='text-center font-josefin text-main-white'
        >
          nicetomeetyou@gmail.com
        </Text>
      </div>

      <div className='flex flex-1 flex-col'>
        {menu.map((item, index) => (
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
            className='h-1/6 gap-5 px-4 font-lato text-main-white ring-1 ring-main-skyblue hover:bg-main-skyblue'
          >
            {item.title}
          </Text>
        ))}
      </div>
    </div>
  );
};
