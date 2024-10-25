import React, { useRef } from 'react';
import Moveable, { OnDrag } from 'react-moveable';

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
  const inputElementRef = useRef<HTMLInputElement>(null);

  const onDrag = ({ target, transform }: OnDrag) => {
    target.style.transform = transform;
  };

  return (
    <>
      <input className='w-20 px-3' ref={inputElementRef} value={input.value} />

      <Moveable
        className='ring-0'
        target={inputElementRef}
        origin={false}
        draggable={true}
        onDrag={onDrag}
      />
    </>
  );
};
