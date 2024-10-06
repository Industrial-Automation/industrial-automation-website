import React, { createContext, useState } from 'react';

import { ModalNames } from '../constants/modals';
import { ModalFrames, ModalsType, ModalVariants } from '../components/Modals';

interface ModalsContextType<
  N extends ModalNames,
  F extends keyof typeof ModalFrames,
  V extends keyof typeof ModalVariants,
  S extends boolean
> {
  readonly modalStash?: ModalsType<N, F, V, S>[];
  readonly setModalStash?: React.Dispatch<React.SetStateAction<ModalsType<N, F, V, S>[]>>;
}

export const ModalsContext = createContext<
  ModalsContextType<ModalNames, keyof typeof ModalFrames, keyof typeof ModalVariants, boolean>
>({});

export const useModalProvider = <
  N extends ModalNames,
  F extends keyof typeof ModalFrames,
  V extends keyof typeof ModalVariants,
  S extends boolean
>() => {
  const [modalStash, setModalStash] = useState<ModalsType<N, F, V, S>[]>([]);

  return {
    modalStash,
    setModalStash
  };
};
