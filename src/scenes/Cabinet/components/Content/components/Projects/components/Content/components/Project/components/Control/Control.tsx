import { CircleProgress } from 'src/components/CircleProgress';

export const Control = () => {
  return (
    <div className='flex w-full flex-col items-center justify-between p-2'>
      <CircleProgress value={10} background={'white'} />
    </div>
  );
};
