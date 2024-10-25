import { useRef } from 'react';
import Moveable, { OnDrag } from 'react-moveable';

export const TextElement = () => {
  const textElementRef = useRef(null);

  const onDrag = ({ target, transform }: OnDrag) => {
    target.style.transform = transform;
  };

  return (
    <>
      <p ref={textElementRef} className='text-md font-lato' />

      <Moveable
        className='ring-0'
        target={textElementRef}
        origin={false}
        draggable={true}
        onDrag={onDrag}
      />
    </>
  );
};
