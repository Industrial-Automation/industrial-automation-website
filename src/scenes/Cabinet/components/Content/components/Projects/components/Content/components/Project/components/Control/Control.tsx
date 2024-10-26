import { Text } from 'src/components/Text';
import { Icons } from 'src/components/Icons';
import { Button } from 'src/components/Button';
import { Switcher } from 'src/components/Switcher';
import { CircleProgress } from 'src/components/CircleProgress';

const controlElements = [
  {
    id: '1',
    type: 'switcher',
    value: false,
    unit: null,
    title: 'Title 1',
    description: 'Start/Stop motor',
    isEditable: false
  },
  {
    id: '2',
    type: 'regulator',
    value: 20,
    unit: '0^C',
    title: 'Title 2',
    description: 'Temperature',
    isEditable: false
  },
  {
    id: '1',
    type: 'switcher',
    value: false,
    unit: null,
    title: 'Title 1',
    description: 'Start/Stop motor',
    isEditable: false
  },
  {
    id: '2',
    type: 'regulator',
    value: 1,
    unit: '0^C',
    title: 'Title 2',
    description: 'Temperature',
    isEditable: false
  },
  {
    id: '1',
    type: 'switcher',
    value: false,
    unit: null,
    title: 'Title 1',
    description: 'Start/Stop motor',
    isEditable: false
  },
  {
    id: '2',
    type: 'regulator',
    value: 1,
    unit: '0^C',
    title: 'Title 2',
    description: 'Temperature',
    isEditable: false
  }
];

export const Control = () => {
  return (
    <div className='scrollbar grid h-full w-full grid-cols-3 gap-5 overflow-y-auto p-2'>
      {controlElements.map((controlElement) => (
        <div
          key={controlElement.id}
          className='flex flex-col justify-between gap-4 rounded-3xl bg-subtone-black-5 p-3'
        >
          <div className='flex flex-row items-center justify-between'>
            <Text as='p' variant='header_3' className='text-main-white'>
              {controlElement.title}
            </Text>

            <div className='rounded-full bg-subtone-black-4 p-2'>
              <Icons variant='menu' size='sm' color='white' />
            </div>
          </div>

          <div className='flex w-full flex-row items-center justify-center'>
            {controlElement.type === 'switcher' ? (
              <Switcher
                className='mb-9'
                barColor='gray'
                checkedBarColor='skyblue'
                circleColor='white'
              />
            ) : (
              <div className='flex flex-col items-center'>
                <CircleProgress
                  className='w-48'
                  barColor='gray'
                  circleColor='white'
                  strokeWidth={8}
                  reduction={0.15}
                  value={controlElement.value as number}
                />

                <div className='flex flex-row items-center gap-10'>
                  <Button
                    className='!h-4 !w-4 !p-4 text-main-white'
                    variant='secondary'
                    color='graphite'
                    size='md'
                    label='-'
                    onClick={() => {}}
                  />

                  <Button
                    className='!h-4 !w-4 !p-4 text-main-white'
                    variant='secondary'
                    color='graphite'
                    size='md'
                    label='+'
                    onClick={() => {}}
                  />
                </div>
              </div>
            )}
          </div>

          <Text as='p' align='center' variant='sm_medium' className='text-center text-main-white'>
            {controlElement.description}
          </Text>
        </div>
      ))}
    </div>
  );
};
