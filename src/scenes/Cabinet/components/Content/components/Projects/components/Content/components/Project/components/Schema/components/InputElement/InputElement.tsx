import React, { useState } from 'react';
import Moveable, { OnDrag, OnResize } from 'react-moveable';

import { useClickOutside } from 'src/hooks/useClickOutside';
import { SchemaInputType } from 'src/reducers/schema-inputs';

interface InputElementType {
  input: SchemaInputType;
}

export const InputElement: React.FC<InputElementType> = ({ input }) => {
  const [isSelected, setIsSelected] = useState(false);

  const inputElementRef = useClickOutside(() => setIsSelected(false));

  const handleOnSelect = () => {
    setIsSelected(true);
  };

  const handleOnDrag = ({ target, transform }: OnDrag) => {
    target.style.transform = transform;
  };

  const handleOnResize = ({ delta, target, width, height }: OnResize) => {
    if (delta[0]) {
      target.style.width = `${width}px`;
    }

    if (delta[1]) {
      target.style.height = `${height}px`;
    }
  };

  return (
    <div className='w-20' ref={inputElementRef}>
      <input className='w-full rounded-2xl px-3' value={input.value} onClick={handleOnSelect} />

      <Moveable
        className='ring-0'
        target={inputElementRef}
        origin={false}
        draggable={true}
        resizable={isSelected}
        onDrag={handleOnDrag}
        onResize={handleOnResize}
        edge={false}
      />
    </div>
  );
};
