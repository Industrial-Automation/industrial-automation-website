import { Text } from 'src/components/Text';

import Translations from './translations';

export const Footer = () => {
  return (
    <div className='flex flex-row items-end justify-center'>
      <Text as='p' variant='sm_medium' className='font-lato text-main-white'>
        {Translations.allRights}
      </Text>
    </div>
  );
};
