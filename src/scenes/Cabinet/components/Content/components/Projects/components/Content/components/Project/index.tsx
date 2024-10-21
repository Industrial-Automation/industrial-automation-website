import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Text } from 'src/components/Text';
import { useModal } from 'src/hooks/useModal';
import { Button } from 'src/components/Button';
import { ModalNames } from 'src/constants/modals';
import { fetchGetProjectScreens, ProjectsStateType } from 'src/reducers/project-screens';

import { Schema } from './components/Schema';
import { EmptyState } from './components/EmptyState';

import Translations from './translations';

const Modes = Object.freeze({
  SCHEMA: 'schema',
  CONTROL: 'control'
});

const Project = () => {
  const { project_screens } = useSelector<any>(
    (state) => state.project_screens
  ) as ProjectsStateType;

  const { id: projectId } = useParams();

  const modal = useModal();

  const [selectedScreen, setSelectedScreen] = useState(project_screens[0]);

  const [mode, setMode] = useState<(typeof Modes)[keyof typeof Modes]>(Modes.SCHEMA);

  const handleChangeMode = (newMode: (typeof Modes)[keyof typeof Modes]) => {
    setMode(newMode);
  };

  const handleOpenProjectScreenMenu = (e: MouseEvent) => {
    if (projectId && selectedScreen) {
      const element = e.target as HTMLButtonElement;

      modal({
        name: ModalNames.ProjectMenu,
        show: true,
        frame: {
          type: 'contextModal',
          props: { className: '!bg-subtone-black-5', element, size: 'sm' }
        },
        variant: {
          type: 'projectScreenMenu',
          props: { id: selectedScreen.id, name: selectedScreen.name, projectId }
        }
      });
    }
  };

  useEffect(() => {
    if (!project_screens.length && projectId) {
      fetchGetProjectScreens(projectId);
    }
  }, [projectId, project_screens.length]);

  useEffect(() => {
    if (!selectedScreen) {
      setSelectedScreen(project_screens[0]);
    }
  }, [project_screens, selectedScreen]);

  if (!project_screens.length || !selectedScreen) {
    return projectId && <EmptyState projectId={projectId} />;
  }

  return (
    <div className='flex h-full w-full flex-col items-center justify-between p-1'>
      <div className='mb-10 flex w-full flex-row items-center justify-between'>
        <Button
          className='!rounded-full !py-5'
          icon='arrow_left'
          iconSize='sm'
          iconColor='white'
          color='skyblue'
          onClick={() => {}}
        />

        <Text as='h2' variant='header_2' className='text-center font-lato text-main-white'>
          {selectedScreen.name}
        </Text>

        <Button
          className='!rounded-full !py-5'
          icon='arrow_right'
          iconSize='sm'
          iconColor='white'
          color='skyblue'
          onClick={() => {}}
        />
      </div>

      <Schema />

      <div className='flex w-full items-center justify-between'>
        <Button
          icon='dots_menu'
          iconSize='sm'
          iconColor='white'
          onClick={handleOpenProjectScreenMenu}
        />

        <div className='flex w-52'>
          <Button
            className='w-1/2 !rounded-r-none'
            variant='primary'
            color={mode === Modes.SCHEMA ? 'skyblue' : 'white'}
            size='sm'
            label={Translations.schemaBtn}
            onClick={() => handleChangeMode(Modes.SCHEMA)}
          />

          <Button
            className='w-1/2 !rounded-l-none'
            variant='primary'
            color={mode === Modes.CONTROL ? 'skyblue' : 'white'}
            size='sm'
            label={Translations.controlBtn}
            onClick={() => handleChangeMode(Modes.CONTROL)}
          />
        </div>
      </div>
    </div>
  );
};

export default Project;
