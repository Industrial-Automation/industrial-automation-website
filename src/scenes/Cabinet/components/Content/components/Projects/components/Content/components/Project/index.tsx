import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Text } from 'src/components/Text';
import { Button } from 'src/components/Button';
import { fetchGetProjectScreens, ProjectsStateType } from 'src/reducers/project-screens';

import { Schema } from './components/Schema';
import { EmptyState } from './components/EmptyState';

import Translations from './translations';

const Project = () => {
  const { id: projectId } = useParams();

  const { project_screens } = useSelector<any>(
    (state) => state.project_screens
  ) as ProjectsStateType;

  useEffect(() => {
    if (!project_screens.length && projectId) {
      fetchGetProjectScreens(projectId);
    }
  }, [projectId, project_screens.length]);

  if (!project_screens.length) {
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
          Screen 1
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
        <Button icon='dots_menu' iconSize='sm' iconColor='white' onClick={() => {}} />

        <div className='flex w-52'>
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
    </div>
  );
};

export default Project;
