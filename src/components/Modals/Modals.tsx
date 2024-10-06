import React, { Attributes, useContext, useEffect } from 'react';

import { merge } from 'src/utils';
import { ModalNames } from 'src/constants/modals';
import { ModalsContext, useModalProvider } from 'src/contexts/modals';

import { Modal } from './components/Modal';
import { Popup } from './components/Popup';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';
import { ArrowModal } from './components/ArrowModal';
import { ConfirmCode } from './components/ConfirmCode';
import { ResetPassword } from './components/ResetPassword';
import { ForgotPassword } from './components/ForgotPassword';

export const ModalVariants = {
  signIn: SignIn,
  signUp: SignUp,
  confirmCode: ConfirmCode,
  resetPassword: ResetPassword,
  forgotPassword: ForgotPassword
};

export const ModalFrames = {
  popup: Popup,
  modal: Modal,
  arrowModal: ArrowModal
};

export type ModalFrameProps<
  F extends keyof typeof ModalFrames,
  D extends boolean = true
> = D extends true
  ? React.ComponentProps<(typeof ModalFrames)[F]>
  : Omit<React.ComponentProps<(typeof ModalFrames)[F]>, 'name' | 'variant'>;

export type ModalVariantProps<V extends keyof typeof ModalVariants> = (
  | React.ComponentProps<(typeof ModalVariants)[V]>
  | Record<string, never>
) &
  Attributes;

export interface ModalVariantType<V extends keyof typeof ModalVariants> {
  readonly type: V;
  readonly props: ModalVariantProps<V>;
}

export type ModalFrameDefaultProps<N extends ModalNames, V extends keyof typeof ModalVariants> = {
  readonly name: N;
  readonly variant: ModalVariantType<V>;
  readonly ignoreClickOutside?: boolean;
  readonly isOverlay?: boolean;
} & Attributes;

export interface ModalFrameType<F extends keyof typeof ModalFrames> {
  readonly type: F;
  readonly props: ModalFrameProps<F, false>;
}

export interface ModalsType<
  N extends ModalNames,
  F extends keyof typeof ModalFrames,
  V extends keyof typeof ModalVariants,
  S extends boolean
> {
  readonly name: N;
  readonly frame: ModalFrameType<F>;
  readonly variant: ModalVariantType<V>;
  readonly show: S;
  readonly isOverlay?: boolean;
}

interface ModalProviderType {
  readonly children: React.ReactNode;
}

export const Modals: React.FC = <
  N extends ModalNames,
  F extends keyof typeof ModalFrames,
  V extends keyof typeof ModalVariants,
  S extends boolean
>() => {
  const { modalStash } = useContext(ModalsContext);

  const propsWithDefault = (modalStash || []).map((modal) =>
    merge(
      {
        isOverlay: false,
        frame: {
          props: {
            ignoreClickOutside: false
          }
        }
      } as Required<ModalsType<N, F, V, S>>,
      modal
    )
  );

  useEffect(() => {
    if (propsWithDefault.length) {
      document.body.style.overflow = 'hidden';

      return;
    }

    document.body.style.overflow = 'auto';
  }, [propsWithDefault]);

  return (
    <>
      {propsWithDefault.map((modal) => (
        <div
          key={modal.name}
          className={[
            'flex',
            'items-center',
            'justify-center',
            'fixed',
            'top-0',
            'left-0',
            'w-full',
            'h-full',
            'duration-200',
            'z-[500]',
            modal.isOverlay && 'bg-subtone-black-1'
          ].join(' ')}
        >
          {React.createElement(
            ModalFrames[modal.frame.type] as React.FC<ModalFrameProps<F>>,
            {
              ...modal.frame.props,
              name: modal.name,
              variant: modal.variant
            } as ModalFrameProps<F>
          )}
        </div>
      ))}
    </>
  );
};

export const ModalProvider = ({ children }: ModalProviderType) => {
  const value = useModalProvider();

  return <ModalsContext.Provider value={value}>{children}</ModalsContext.Provider>;
};
