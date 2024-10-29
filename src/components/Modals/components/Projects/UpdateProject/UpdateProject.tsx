import React, { useState } from 'react';

import { Text } from 'src/components/Text';
import { Input } from 'src/components/Input';
import { useModal } from 'src/hooks/useModal';
import { Button } from 'src/components/Button';
import { ModalNames } from 'src/constants/modals';
import { fetchUpdateProject } from 'src/reducers/projects';

import Translations from './translations';

interface UpdateProjectPropsType {
  id: string;
  name: string;
  opc_url: string;
  opc_namespace_index: number;
}

export const UpdateProject: React.FC<UpdateProjectPropsType> = (project) => {
  const modal = useModal();

  const [name, setName] = useState(project.name);

  const [opcUrl, setOpcUrl] = useState(project.opc_url);
  const [opcNamespaceIndex, setOpcNamespaceIndex] = useState<number>(project.opc_namespace_index);

  const handleUpdateProject = async () => {
    if (name) {
      await fetchUpdateProject(project.id, {
        name,
        opc_url: opcUrl,
        opc_namespace_index: opcNamespaceIndex
      });

      modal({
        name: ModalNames.UpdateProject,
        show: false
      });
    }
  };

  return (
    <div className='flex flex-col items-center gap-5 px-10 pb-5'>
      <Text as='h2' variant='header_2' className='font-lato text-main-white'>
        {Translations.updateProjectHeading}
      </Text>

      <Input
        className='h-14 w-80 bg-main-white shadow-skyblue ring-0 [&>input]:text-sm'
        labelClassName='text-main-white'
        value={name}
        placeholder={Translations.namePlaceholder}
        label={Translations.nameLabel}
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        className='h-14 w-80 bg-main-white shadow-skyblue ring-0 [&>input]:text-sm'
        labelClassName='text-main-white'
        value={opcUrl}
        placeholder={Translations.opcUrlPlaceholder}
        label={Translations.opcUrlLabel}
        onChange={(e) => setOpcUrl(e.target.value)}
      />

      <Input
        className='mb-5 h-14 w-80 bg-main-white shadow-skyblue ring-0 [&>input]:text-sm'
        type='number'
        labelClassName='text-main-white'
        value={opcNamespaceIndex?.toString()}
        placeholder={Translations.opcNamespaceIndexPlaceholder}
        label={Translations.opcNamespaceIndexLabel}
        onChange={(e) => setOpcNamespaceIndex(Number(e.target.value))}
      />

      <Button
        className='w-64'
        variant='secondary'
        color='skyblue'
        size='md'
        label={Translations.renameProjectBtn}
        onClick={handleUpdateProject}
      />
    </div>
  );
};
