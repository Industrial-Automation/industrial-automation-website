import { Outlet } from 'react-router-dom';

export const Content = () => {
  return (
    <div className='w-full p-3'>
      <Outlet />
    </div>
  );
};
