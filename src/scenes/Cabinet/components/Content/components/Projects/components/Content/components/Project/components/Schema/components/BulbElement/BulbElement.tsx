import { useRef } from 'react';
import Moveable, { OnDrag } from 'react-moveable';

export const BulbElement = () => {
  const bulbElementRef = useRef(null);

  const onDrag = ({ target, transform }: OnDrag) => {
    target.style.transform = transform;
  };

  return (
    <>
      <div ref={bulbElementRef} />

      <Moveable
        className='ring-0'
        target={bulbElementRef}
        origin={false}
        draggable={true}
        onDrag={onDrag}
      />
    </>
  );
};
