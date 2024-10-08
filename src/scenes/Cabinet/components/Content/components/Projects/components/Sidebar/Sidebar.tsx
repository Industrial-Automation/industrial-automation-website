import { useParams } from 'react-router-dom';

import { Paths } from 'src/routes';
import { Text } from 'src/components/Text';

import Translations from './translations';

const projects = [
  {
    id: 1,
    name: 'Project 1'
  },
  {
    id: 2,
    name: 'Project 2'
  },
  {
    id: 3,
    name: 'Project 3'
  },
  {
    id: 4,
    name: 'Project 4'
  },
  {
    id: 5,
    name: 'Project 5'
  },
  {
    id: 6,
    name: 'Project 6'
  }
];

const modes = ['Schema', 'Control'];

export const Sidebar = () => {
  const params = useParams();

  const getProjectClass = (project: (typeof projects)[number]) =>
    [
      'gap-3',
      'rounded-lg',
      'px-2',
      'py-3',
      'font-lato',
      'text-main-black',
      'hover:bg-subtone-skyblue-1',
      params.id === project.id.toString() && 'bg-subtone-skyblue-1'
    ]
      .filter(Boolean)
      .join(' ');

  return (
    <div className='flex h-full w-60 flex-col border-r-2 border-r-subtone-gray-2 p-3'>
      <Text
        as='h2'
        variant='header_2'
        className='mb-5 mt-2 p-2 text-center font-lato text-main-black'
      >
        {Translations.title}
      </Text>

      <div className='modal-scrollbar flex flex-col overflow-y-auto pr-5'>
        {projects.map((project) => (
          <Text
            key={project.id}
            as='a'
            variant='sm_medium'
            href={`${Paths.Projects}/${project.id}`}
            className={getProjectClass(project)}
          >
            {project.name}
          </Text>
        ))}
      </div>

      <div className={''}>
        {modes.map((mode, index) => (
          <Text
            key={index}
            as='a'
            variant='sm_medium'
            href={`${Paths.Projects}/${index}`}
            className={''}
          >
            {mode}
          </Text>
        ))}
      </div>
    </div>
  );
};
