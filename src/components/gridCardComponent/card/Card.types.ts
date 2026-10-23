import type * as React from 'react';
import type {
  CardProps,
  ImageProps,
  MenuItemProps,
} from '@fluentui/react-components';

export interface ICardMoreOptionProps {
  key: string;
  label: string;
  onClick: NonNullable<MenuItemProps['onClick']>;
  icon?: MenuItemProps['icon'];
  disabled?: boolean;
}

export interface ICardPreviewProps {
  image: ImageProps;
  logo?: ImageProps;
}

/**
 * All Fluent `CardProps` (appearance, orientation, size, focusMode, selected,
 * defaultSelected, onSelectionChange, disabled, floatingAction, checkbox, ref, ...)
 * pass straight through. Body content goes in `children`.
 */
export interface ICardProps extends CardProps {
  /** Card title. Strings are rendered with `Body1Strong`. */
  header?: string | React.ReactElement;
  /** Secondary text under the title. Strings are rendered with `Caption1`. */
  description?: string | React.ReactElement;
  /** Items for the header's "More actions" menu. The menu is hidden when empty. */
  moreOptions?: ICardMoreOptionProps[];
  /** Preview image (and optional logo badge) rendered above the header. */
  preview?: ICardPreviewProps;
  /** Content for the card footer, typically action buttons. */
  footer?: React.ReactNode;
}
