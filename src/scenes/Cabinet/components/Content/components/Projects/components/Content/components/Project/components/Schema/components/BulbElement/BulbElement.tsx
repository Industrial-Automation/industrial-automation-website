import Moveable, { OnDrag, OnResize } from 'react-moveable';
import React, { KeyboardEvent, useEffect, useMemo, useState } from 'react';

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

  const colorClass = useMemo(() => {
    if (
      (bulb.critical_min_value && bulb.value <= bulb.critical_min_value) ||
      (bulb.critical_max_value && bulb.value >= bulb.critical_max_value)
    ) {
      return 'bg-main-red';
    }

    if (
      (bulb.warning_min_value && bulb.value <= bulb.warning_min_value) ||
      (bulb.warning_max_value && bulb.value >= bulb.warning_max_value)
    ) {
      return 'bg-main-red';
    }

    return 'bg-main-green';
  }, [
    bulb.critical_max_value,
    bulb.critical_min_value,
    bulb.value,
    bulb.warning_max_value,
    bulb.warning_min_value
  ]);

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
            warning_min_value: bulb.warning_min_value,
            warning_max_value: bulb.warning_max_value,
            critical_min_value: bulb.critical_min_value,
            critical_max_value: bulb.critical_max_value,
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
    bulb.critical_max_value,
    bulb.critical_min_value,
    bulb.description,
    bulb.id,
    bulb.tag,
    bulb.title,
    bulb.unit,
    bulb.warning_max_value,
    bulb.warning_min_value,
    bulbElementRef,
    isSelected
  ]);

  return (
    <>
      <div
        role='button'
        tabIndex={0}
        className={`absolute h-2 w-2 rounded-full ring-1 ring-main-gray ${colorClass}`}
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
