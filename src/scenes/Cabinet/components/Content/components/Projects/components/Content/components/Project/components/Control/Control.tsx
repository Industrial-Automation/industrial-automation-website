import { Text } from 'src/components/Text';
import { Icons } from 'src/components/Icons';
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
    value: 1,
    unit: '0^C',
    title: 'Title 2',
    description: 'Temperature dfsdfsd ds d as loren fsf as gfdcivfd',
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
    description: 'Temperature dfsdfsd ds d as loren fsf as gfdcivfd',
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
    description: 'Temperature dfsdfsd ds d as loren fsf as gfdcivfd',
    isEditable: false
  }
];

export const Control = () => {
  return (
    <div className='scrollbar grid h-full w-full grid-cols-3 gap-5 overflow-y-auto p-2'>
      {controlElements.map((controlElement) => (
        <div
          key={controlElement.id}
          className='flex h-80 flex-col justify-between gap-2 rounded-3xl bg-subtone-black-5 p-3'
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
              <>f</>
            ) : (
              <CircleProgress className='w-48' value={controlElement.value as number} />
            )}
          </div>

          <div className=''>
            <Text as='p' variant='sm_medium' className='text-main-white'>
              {controlElement.description}
            </Text>
          </div>
        </div>
      ))}
    </div>
  );
};
