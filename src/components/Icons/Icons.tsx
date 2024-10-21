import React, { useMemo } from 'react';

import { merge } from 'src/utils';

import Bin from 'src/assets/icons/bin.svg';
import Bulb from 'src/assets/icons/bulb.svg';
import File from 'src/assets/icons/file.svg';
import Help from 'src/assets/icons/help.svg';
import Exit from 'src/assets/icons/exit.svg';
import User from 'src/assets/icons/user.svg';
import Text from 'src/assets/icons/text.svg';
import Plus from 'src/assets/icons/plus.svg';
import Close from 'src/assets/icons/close.svg';
import Input from 'src/assets/icons/input.svg';
import Pencil from 'src/assets/icons/pencil.svg';
import Folder from 'src/assets/icons/folder.svg';
import Upload from 'src/assets/icons/upload.svg';
import Profile from 'src/assets/icons/profile.svg';
import Security from 'src/assets/icons/security.svg';
import Settings from 'src/assets/icons/settings.svg';
import DotsMenu from 'src/assets/icons/dots-menu.svg';
import Checkmark from 'src/assets/icons/checkmark.svg';
import Mechanism from 'src/assets/icons/mechanism.svg';
import ArrowLeft from 'src/assets/icons/arrow-left.svg';
import ArrowRight from 'src/assets/icons/arrow-right.svg';
import ProfileCard from 'src/assets/icons/profile-card.svg';
import DotsVertical from 'src/assets/icons/dots-vertical.svg';
import DotsHorizontal from 'src/assets/icons/dots-horizontal.svg';

const Icon = Object.freeze({
  bin: Bin,
  bulb: Bulb,
  file: File,
  help: Help,
  exit: Exit,
  user: User,
  text: Text,
  plus: Plus,
  close: Close,
  input: Input,
  pencil: Pencil,
  folder: Folder,
  upload: Upload,
  profile: Profile,
  security: Security,
  settings: Settings,
  dots_menu: DotsMenu,
  checkmark: Checkmark,
  mechanism: Mechanism,
  arrow_left: ArrowLeft,
  arrow_right: ArrowRight,
  profile_card: ProfileCard,
  dots_vertical: DotsVertical,
  dots_horizontal: DotsHorizontal
});

const IconSizes = Object.freeze({
  xs: 'w-4 h-4',
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-10 h-10',
  xl: 'w-12 h-12'
});

export interface IconType extends React.HTMLAttributes<HTMLElement> {
  readonly className?: React.HTMLAttributes<HTMLElement>['className'];

  readonly size?: keyof typeof IconSizes;
  readonly color?: string;
}

export interface IconsType extends IconType {
  readonly variant: keyof typeof Icon;
}

export const Icons = (props: IconsType) => {
  const propsWithDefault = merge(
    {
      size: 'md'
    } as Required<IconsType>,
    props
  );

  const elementClasses = useMemo(
    () => [IconSizes[propsWithDefault.size], propsWithDefault.className].filter(Boolean).join(' '),
    [propsWithDefault]
  );

  return React.createElement(Icon[propsWithDefault.variant], {
    color: propsWithDefault.color,
    className: elementClasses,
    onClick: propsWithDefault.onClick,
    onMouseEnter: propsWithDefault.onMouseEnter,
    onMouseLeave: propsWithDefault.onMouseLeave
  });
};
