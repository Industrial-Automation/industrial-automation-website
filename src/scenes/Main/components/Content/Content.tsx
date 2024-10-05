import { Text } from 'src/components/Text';
import { Button } from 'src/components/Button';

import Translations from './translations';

export const Content = () => {
  return (
    <div className='mb-28'>
      <Text as='h1' variant='header_1' className='font-josefin text-main-white'>
        {Translations.title}
      </Text>

      <Text as='p' variant='base_medium' className='mt-5 max-w-lg font-josefin text-main-white'>
        {Translations.description}
      </Text>

      <Button
        className='mt-7'
        as='button'
        size='lg'
        color='skyblue'
        label={Translations.getStartedBtn}
      />
    </div>
  );
};
