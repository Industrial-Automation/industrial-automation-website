import React, { KeyboardEvent, useEffect, useState } from 'react';
import Moveable, { OnDrag, OnResize } from 'react-moveable';

import { useModal } from 'src/hooks/useModal';
import { ModalNames } from 'src/constants/modals';
import { SchemaBulbType } from 'src/reducers/schema-bulbs';
import { useClickOutside } from 'src/hooks/useClickOutside';

interface BulbElementType {
  bulb: SchemaBulbType;
  onChange: (id: string, data: Partial<SchemaBulbType>) => void;
}

export const BulbElement: React.FC<BulbElementType> = ({ bulb, onChange }) => {
  const modal = useModal();

  const [isSelected, setIsSelected] = useState(false);

  const bulbElementRef = useClickOutside<HTMLDivElement>(
    () => setIsSelected(false),
    undefined,
    'schema-bulb-menu'
  );

  const handleOnSelect = () => {
    setIsSelected(true);
  };

  const handleOnDrag = ({ target, top, left }: OnDrag) => {
    target.style.top = top + 'px';
    target.style.left = left + 'px';

    onChange(bulb.id, { x: left, y: top });
  };

  const handleOnResize = ({ target, width, height }: OnResize) => {
    target.style.width = width + 'px';
    target.style.height = height + 'px';

    onChange(bulb.id, { width, height });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleOnSelect();
    }
  };

  useEffect(() => {
    if (bulbElementRef && bulbElementRef.current) {
      bulbElementRef.current.style.top = bulb.y + 'px';
      bulbElementRef.current.style.left = bulb.x + 'px';

      bulbElementRef.current.style.width = bulb.width + 'px';
      bulbElementRef.current.style.height = bulb.height + 'px';
    }
  }, [bulb.height, bulb.width, bulb.x, bulb.y, bulbElementRef]);

  useEffect(() => {
    if (isSelected && bulbElementRef && bulbElementRef.current) {
      const callback = () => {
        modal({
          name: ModalNames.SchemaBulbMenu,
          show: false
        });

        setIsSelected(false);
      };

      modal({
        name: ModalNames.SchemaBulbMenu,
        show: true,
        frame: {
          type: 'contextModal',
          props: {
            className: '!bg-subtone-black-6',
            element: bulbElementRef.current,
            size: 'lg',
            prioritySide: 'left'
          }
        },
        variant: {
          type: 'schemaBulbMenu',
          props: {
            id: bulb.id,
            title: bulb.title,
            description: bulb.description || '',
            min_value: bulb.min_value,
            max_value: bulb.max_value,
            unit: bulb.unit,
            tag: bulb.tag,
            callback
          }
        }
      });
    } else {
      modal({
        name: ModalNames.SchemaBulbMenu,
        show: false
      });
    }
  }, [
    bulb.description,
    bulb.id,
    bulb.max_value,
    bulb.min_value,
    bulb.tag,
    bulb.title,
    bulb.unit,
    bulbElementRef,
    isSelected
  ]);

  return (
    <>
      <div
        role='button'
        tabIndex={0}
        className='absolute h-2 w-2 rounded-full bg-main-white'
        onClick={handleOnSelect}
        ref={bulbElementRef}
        onKeyDown={handleKeyDown}
      />

      <Moveable
        target={bulbElementRef.current}
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
