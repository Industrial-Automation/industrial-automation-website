import { Sidebar } from './components/Sidebar';
import { Content } from './components/Content';

const Projects = () => {
  return (
    <div className='flex h-full flex-row'>
      <Sidebar />

      <Content />
    </div>
  );
};

export default Projects;
