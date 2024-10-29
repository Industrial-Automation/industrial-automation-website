import React, { useState } from 'react';
import Moveable, { OnDrag, OnResize } from 'react-moveable';

import { useClickOutside } from 'src/hooks/useClickOutside';

interface InputType {
  id: string;
  size: { width: number; height: number };
  coords: { x: number; y: number };
  value: string | number;
  tag: string;
}

interface InputElementType {
  input: InputType;
}

export const InputElement: React.FC<InputElementType> = ({ input }) => {
  const [isSelected, setIsSelected] = useState(false);

  const inputElementRef = useClickOutside<HTMLInputElement>(() => setIsSelected(false));

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
    <>
      <input
        className='w-20 rounded-2xl px-3'
        ref={inputElementRef}
        value={input.value}
        onClick={handleOnSelect}
      />

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
    </>
  );
};
