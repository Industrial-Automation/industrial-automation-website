import { Outlet } from 'react-router-dom';

export const Content = () => {
  return (
    <div className='h-full w-full rounded-3xl bg-subtone-black-3'>
      <Outlet />
    </div>
  );
};
