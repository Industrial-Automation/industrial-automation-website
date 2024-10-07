import { Sidebar } from './components/Sidebar';
import { Content } from './components/Content';

const Cabinet = () => {
  return (
    <div className='flex h-screen gap-4 bg-main-midnight p-3'>
      <Sidebar />

      <Content />
    </div>
  );
};

export default Cabinet;
