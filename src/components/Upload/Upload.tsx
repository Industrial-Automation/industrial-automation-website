import React, { useMemo, useRef } from 'react';

import { Text } from '../Text';
import { Icons } from '../Icons';
import { Button } from '../Button';

export interface UploadType {
  readonly className?: React.HTMLAttributes<HTMLDivElement>['className'];
  readonly titleClassName?: React.HTMLAttributes<HTMLDivElement>['className'];
  readonly descriptionClassName?: React.HTMLAttributes<HTMLDivElement>['className'];
  readonly buttonClassName?: React.HTMLAttributes<HTMLDivElement>['className'];

  readonly title: string;
  readonly description: string;
  readonly buttonText: string;

  readonly onChangeFile: (files: FileList) => void;
}

export const Upload = (props: UploadType) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const elementClasses = useMemo(
    () =>
      [
        'flex',
        'h-full',
        'w-full',
        'flex-col',
        'items-center',
        'justify-center',
        'gap-5',
        'rounded-3xl',
        'border-2',
        'border-dashed',
        'border-main-white',
        props.className
      ]
        .filter(Boolean)
        .join(' '),
    [props.className]
  );

  const titleClasses = useMemo(
    () => ['font-lato', 'text-main-white', props.titleClassName].filter(Boolean).join(' '),
    [props.titleClassName]
  );

  const descriptionClasses = useMemo(
    () => ['font-lato', 'text-main-white', props.descriptionClassName].filter(Boolean).join(' '),
    [props.descriptionClassName]
  );

  const buttonClasses = useMemo(
    () => ['mt-5', 'mb-10', 'w-40', props.buttonClassName].filter(Boolean).join(' '),
    [props.buttonClassName]
  );

  const handleFileChange = (files: FileList | null) => {
    if (!files) {
      return;
    }

    props.onChangeFile(files);
  };

  return (
    <div className={elementClasses}>
      <Icons className='!h-20 !w-20' variant='upload' color='white' />

      <Text as='p' variant='header_3' className={titleClasses}>
        {props.title}
      </Text>

      <Text as='p' variant='sm_medium' className={descriptionClasses}>
        {props.description}
      </Text>

      <input
        ref={fileInputRef}
        hidden
        type='file'
        onChange={(e) => handleFileChange(e.target.files)}
        accept='.png, .jpg, .jpeg'
      />

      <Button
        className={buttonClasses}
        variant='secondary'
        color='skyblue'
        size='md'
        label={props.buttonText}
        onClick={() => fileInputRef.current?.click()}
      />
    </div>
  );
};
