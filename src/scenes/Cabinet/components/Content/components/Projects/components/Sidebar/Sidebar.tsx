import { useParams } from 'react-router-dom';

import { Paths } from 'src/routes';
import { Text } from 'src/components/Text';
import { Button } from 'src/components/Button';

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
  },
  {
    id: 7,
    name: 'Project 7'
  }
];

export const Sidebar = () => {
  const params = useParams();

  const getProjectClass = (project: (typeof projects)[number]) =>
    [
      'gap-3',
      'rounded-lg',
      'px-2',
      'py-3',
      'font-lato',
      'text-main-white',
      'hover:bg-subtone-skyblue-1',
      params.id === project.id.toString() && 'bg-subtone-skyblue-1'
    ]
      .filter(Boolean)
      .join(' ');

  return (
    <div className='flex h-full w-72 flex-col justify-between border-r-2 border-r-subtone-gray-3 p-3 pr-1'>
      <div className='flex h-4/5 flex-col gap-5 pr-1'>
        <Text as='h2' variant='header_2' className='mt-2 p-2 text-center font-lato text-main-white'>
          {Translations.title}
        </Text>

        <div className='modal-scrollbar flex flex-col gap-2 overflow-y-auto pr-2'>
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
      </div>

      <div className='flex h-1/5 items-end pr-1'>
        <Button
          className='w-1/2 !rounded-r-none'
          variant='primary'
          color='skyblue'
          size='sm'
          label={Translations.schemaBtn}
          onClick={() => {}}
        />

        <Button
          className='w-1/2 !rounded-l-none'
          variant='primary'
          color='white'
          size='sm'
          label={Translations.controlBtn}
          onClick={() => {}}
        />
      </div>
    </div>
  );
};
