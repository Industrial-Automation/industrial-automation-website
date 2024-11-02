import React, { Attributes, useContext } from 'react';

import { ModalNames } from 'src/constants/modals';
import { ModalsContext } from 'src/contexts/modals';
import {
  ModalFrameProps,
  ModalFrames,
  ModalFrameType,
  ModalsType,
  ModalVariants,
  ModalVariantType
} from 'src/components/Modals';

type ModalFrameForHookType<F extends keyof typeof ModalFrames> = {
  readonly props: ModalFrameProps<F, false>;
} & Omit<ModalFrameType<F>, 'props'>;

type ModalVariantForHookType<V extends keyof typeof ModalVariants> = {
  readonly props: React.ComponentProps<(typeof ModalVariants)[V]> & Attributes;
} & Omit<ModalVariantType<V>, 'props'>;

export type ModalsForHookType<
  N extends ModalNames,
  F extends keyof typeof ModalFrames,
  V extends keyof typeof ModalVariants,
  S extends boolean
> = S extends true
  ? Omit<ModalsType<N, F, V, S>, 'frame' | 'variant'> & {
      readonly frame: ModalFrameForHookType<F>;
      readonly variant: ModalVariantForHookType<V>;
    }
  : Pick<ModalsType<N, F, V, S>, 'name' | 'show'>;

export const useModal = () => {
  const { setModalStash } = useContext(ModalsContext);

  const create = <
    N extends ModalNames,
    F extends keyof typeof ModalFrames,
    V extends keyof typeof ModalVariants,
    S extends boolean
  >(
    modal: ModalsType<N, F, V, S>
  ) => setModalStash && setModalStash((modalStash) => [...modalStash, modal]);

  const remove = (name: string) =>
    setModalStash &&
    setModalStash((modalStash) => modalStash.filter((modal) => modal.name !== name));

  return <
    N extends ModalNames,
    F extends keyof typeof ModalFrames,
    V extends keyof typeof ModalVariants,
    S extends boolean
  >(
    modal: ModalsForHookType<N, F, V, S>
  ) => {
    if (modal.show) {
      create(modal);
    } else {
      remove(modal.name);
    }
  };
};
