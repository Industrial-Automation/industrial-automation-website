import { Sidebar } from './components/Sidebar';
import { Content } from './components/Content';

export const Projects = () => {
  return (
    <div className='flex h-full flex-row'>
      <Sidebar />

      <Content />
    </div>
  );
};
