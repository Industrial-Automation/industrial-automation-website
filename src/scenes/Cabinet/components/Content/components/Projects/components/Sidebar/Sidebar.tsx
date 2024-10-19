import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Paths } from 'src/routes';
import { Text } from 'src/components/Text';
import { useModal } from 'src/hooks/useModal';
import { Button } from 'src/components/Button';
import { ModalNames } from 'src/constants/modals';
import { fetchGetProjects, ProjectsStateType } from 'src/reducers/projects';

import Translations from './translations';

export const Sidebar = () => {
  const { projects } = useSelector<any>((state) => state.projects) as ProjectsStateType;

  const params = useParams();

  const modal = useModal();

  const getProjectClass = (project: (typeof projects)[number]) =>
    [
      'flex',
      'flex-row',
      'items-center',
      'justify-between',
      'rounded-lg',
      'py-2',
      'pl-2',
      'hover:bg-subtone-skyblue-1',
      params.id === project.id && 'bg-subtone-skyblue-1'
    ]
      .filter(Boolean)
      .join(' ');

  const handleOpenProjectMenu = (e: MouseEvent) => {
    const element = e.target as HTMLButtonElement;

    modal({
      name: ModalNames.ProjectMenu,
      show: true,
      frame: {
        type: 'arrowModal',
        props: { element, size: 'sm' }
      },
      variant: {
        type: 'projectMenu',
        props: {}
      }
    });
  };

  const handleAddProject = () => {
    modal({
      name: ModalNames.AddProject,
      show: true,
      isOverlay: true,
      frame: {
        type: 'modal',
        props: {}
      },
      variant: {
        type: 'addProject',
        props: {}
      }
    });
  };

  useEffect(() => {
    if (!projects.length) {
      fetchGetProjects();
    }
  }, [projects.length]);

  return (
    <div className='flex h-full w-72 flex-col justify-between border-r-4 border-r-main-midnight p-3 pr-1'>
      <div className='flex h-4/5 flex-col gap-5 pr-1'>
        <Text as='h2' variant='header_2' className='mt-2 p-2 text-center font-lato text-main-white'>
          {Translations.title}
        </Text>

        <div className='modal-scrollbar flex flex-col gap-2 overflow-y-auto pr-2'>
          {projects.map((project) => (
            <div key={project.id} className={getProjectClass(project)}>
              <Text
                as='a'
                variant='sm_medium'
                align='right'
                href={`${Paths.Projects}/${project.id}`}
                icon='file'
                iconSize='xs'
                iconPosition='left'
                iconColor='white'
                className='w-full gap-2 font-lato text-main-white'
              >
                {project.name}
              </Text>

              <Button
                className='w-fit !rounded-full'
                icon='dots_vertical'
                iconSize='xs'
                iconColor='white'
                onClick={handleOpenProjectMenu}
              />
            </div>
          ))}
        </div>
      </div>

      <div className='flex h-1/5 w-full flex-col justify-end pr-1'>
        <div className='mb-10 flex'>
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

        <Button
          className=''
          variant='primary'
          color='gray'
          size='sm'
          label={Translations.addProjectBtn}
          onClick={handleAddProject}
        />
      </div>
    </div>
  );
};
