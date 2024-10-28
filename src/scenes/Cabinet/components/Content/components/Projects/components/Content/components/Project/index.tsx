import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

import { Text } from 'src/components/Text';
import { useModal } from 'src/hooks/useModal';
import { Button } from 'src/components/Button';
import { ModalNames } from 'src/constants/modals';
import { fetchGetProjectScreens, ProjectScreensStateType } from 'src/reducers/project-screens';

import { Schema } from './components/Schema';
import { Control } from './components/Control';
import { EmptyState } from './components/EmptyState';

import Translations from './translations';

const Modes = Object.freeze({
  SCHEMA: 'schema',
  CONTROL: 'control'
});

const Project = () => {
  const { project_screens } = useSelector<any>(
    (state) => state.project_screens
  ) as ProjectScreensStateType;

  const { id: projectId } = useParams();

  const modal = useModal();

  const [selectedOrder, setSelectedOrder] = useState<number>(1);

  const [mode, setMode] = useState<(typeof Modes)[keyof typeof Modes]>(Modes.SCHEMA);

  const sortedProjectScreens = useMemo(
    () => project_screens.sort((a, b) => a.order - b.order),
    [project_screens]
  );

  const selectedScreen = useMemo(
    () => sortedProjectScreens[selectedOrder - 1],
    [selectedOrder, sortedProjectScreens]
  );

  const isFirstScreen = useMemo(
    () => selectedOrder === sortedProjectScreens[0]?.order,
    [selectedOrder, sortedProjectScreens]
  );

  const isLastScreen = useMemo(
    () => selectedOrder === sortedProjectScreens[sortedProjectScreens.length - 1]?.order,
    [selectedOrder, sortedProjectScreens]
  );

  const handleNextScreen = () => {
    setSelectedOrder((prevSelectedOrder) =>
      prevSelectedOrder > sortedProjectScreens.length ? prevSelectedOrder : prevSelectedOrder + 1
    );
  };

  const handlePrevScreen = () => {
    setSelectedOrder((prevSelectedOrder) =>
      prevSelectedOrder - 1 <= 0 ? prevSelectedOrder : prevSelectedOrder - 1
    );
  };

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
          props: { className: '!bg-subtone-black-6', element, size: 'sm' }
        },
        variant: {
          type: 'projectScreenMenu',
          props: {
            id: selectedScreen.id,
            order: selectedScreen.order,
            name: selectedScreen.name,
            projectId,
            successAddCallback: handleNextScreen,
            successDeleteCallback: handlePrevScreen
          }
        }
      });
    }
  };

  const handleAddControlSwitch = () => {
    if (selectedScreen) {
      modal({
        name: ModalNames.AddControlSwitch,
        show: true,
        isOverlay: true,
        frame: {
          type: 'modal',
          props: {}
        },
        variant: {
          type: 'addControlSwitch',
          props: { screenId: selectedScreen.id }
        }
      });
    }
  };

  useEffect(() => {
    if (!project_screens.length && projectId) {
      fetchGetProjectScreens(projectId);
    }
  }, [projectId, project_screens.length]);

  if (!projectId) {
    return;
  }

  if (!project_screens.length || !selectedScreen) {
    return <EmptyState projectId={projectId} />;
  }

  return (
    <div className='flex h-full w-full flex-col items-center justify-between p-1'>
      <div className='mb-5 flex w-full flex-row items-center justify-between'>
        <Button
          className={`!rounded-full !py-5 ${
            isFirstScreen ? 'cursor-auto opacity-0' : 'opacity-100'
          }`}
          icon='arrow_left'
          iconSize='sm'
          iconColor='white'
          color='skyblue'
          disabled={isFirstScreen}
          onClick={handlePrevScreen}
        />

        <Text as='h2' variant='header_2' className='text-center font-lato text-main-white'>
          {selectedScreen.name}
        </Text>

        <Button
          className={`!rounded-full !py-5 ${
            isLastScreen ? 'cursor-auto opacity-0' : 'opacity-100'
          }`}
          icon='arrow_right'
          iconSize='sm'
          iconColor='white'
          color='skyblue'
          disabled={isLastScreen}
          onClick={handleNextScreen}
        />
      </div>

      {mode === Modes.SCHEMA ? (
        <Schema projectScreen={selectedScreen} />
      ) : (
        <Control projectScreen={selectedScreen} />
      )}

      <div className='mt-5 flex w-full items-center justify-between'>
        <Button
          icon='dots_menu'
          iconSize='sm'
          iconColor='white'
          onClick={handleOpenProjectScreenMenu}
        />

        <div className='flex flex-row items-center gap-2'>
          {mode === Modes.CONTROL ? (
            <>
              <Button icon='gauge' iconSize='md' iconColor='white' onClick={() => {}} />

              <Button
                icon='switch'
                iconSize='md'
                iconColor='white'
                onClick={handleAddControlSwitch}
              />
            </>
          ) : (
            <div></div>
          )}
        </div>

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
