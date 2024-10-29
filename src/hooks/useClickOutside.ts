import { useEffect, useRef } from 'react';

export const useClickOutside = <T extends HTMLElement, F extends Element = Element>(
  callback: VoidFunction,
  el?: F
) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const onClick = (e: Event) =>
      ref.current &&
      !ref.current.contains(e.target as Node | null) &&
      (el ? !el.contains(e.target as Node | null) : true) &&
      callback();

    const timeoutId = setTimeout(() => {
      document.body.addEventListener('click', onClick);
    }, 0);

    return () => {
      clearTimeout(timeoutId);

      document.body.removeEventListener('click', onClick);
    };
  }, [callback, el]);

  return ref;
};
