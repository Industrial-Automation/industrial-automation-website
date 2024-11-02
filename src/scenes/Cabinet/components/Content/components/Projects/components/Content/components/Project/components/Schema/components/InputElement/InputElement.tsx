import React, { useEffect, useState } from 'react';
import Moveable, { OnDrag, OnResize } from 'react-moveable';

import { useModal } from 'src/hooks/useModal';
import { ModalNames } from 'src/constants/modals';
import { useClickOutside } from 'src/hooks/useClickOutside';
import { SchemaInputType } from 'src/reducers/schema-inputs';

interface InputElementType {
  input: SchemaInputType;
  onChange: (id: string, data: Partial<SchemaInputType>) => void;
}

export const InputElement: React.FC<InputElementType> = ({ input, onChange }) => {
  const modal = useModal();

  const [isSelected, setIsSelected] = useState(false);

  const inputElementRef = useClickOutside<HTMLInputElement>(
    () => setIsSelected(false),
    undefined,
    'schema-input-menu'
  );

  const handleOnSelect = () => {
    setIsSelected(true);
  };

  const handleOnDrag = ({ target, top, left }: OnDrag) => {
    target.style.top = top + 'px';
    target.style.left = left + 'px';

    onChange(input.id, { x: left, y: top });
  };

  const handleOnResize = ({ target, width, height }: OnResize) => {
    target.style.width = width + 'px';
    target.style.height = height + 'px';

    onChange(input.id, { width, height });
  };

  useEffect(() => {
    if (inputElementRef && inputElementRef.current) {
      inputElementRef.current.style.top = input.y + 'px';
      inputElementRef.current.style.left = input.x + 'px';

      inputElementRef.current.style.width = input.width + 'px';
      inputElementRef.current.style.height = input.height + 'px';
    }
  }, [input.height, input.width, input.x, input.y, inputElementRef]);

  useEffect(() => {
    if (isSelected && inputElementRef && inputElementRef.current) {
      const callback = () => {
        modal({
          name: ModalNames.SchemaInputMenu,
          show: false
        });

        setIsSelected(false);
      };

      modal({
        name: ModalNames.SchemaInputMenu,
        show: true,
        frame: {
          type: 'contextModal',
          props: {
            className: '!bg-subtone-black-6',
            element: inputElementRef.current,
            size: 'lg',
            prioritySide: 'left'
          }
        },
        variant: {
          type: 'schemaInputMenu',
          props: {
            id: input.id,
            title: input.title,
            description: input.description || '',
            unit: input.unit,
            tag: input.tag,
            callback
          }
        }
      });
    } else {
      modal({
        name: ModalNames.SchemaInputMenu,
        show: false
      });
    }
  }, [
    input.description,
    input.id,
    input.tag,
    input.title,
    input.unit,
    inputElementRef,
    isSelected
  ]);

  return (
    <>
      <input
        className='absolute rounded-2xl px-3'
        onClick={handleOnSelect}
        ref={inputElementRef}
        defaultValue={input.value}
      />

      <Moveable
        target={inputElementRef.current}
        origin={false}
        draggable={true}
        resizable={isSelected}
        onDrag={handleOnDrag}
        onResize={handleOnResize}
        edge={false}
        hideDefaultLines={true}
      />
    </>
  );
};
