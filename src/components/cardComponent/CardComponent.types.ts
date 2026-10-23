import type * as React from 'react';
import type { ICardProps } from './card/Card.types';

export type ReflowOptionType = 'static' | 'dynamic' | 'controlled';

export type CardContainerStyleType = React.CSSProperties & {
  '--cards-per-row': number;
  '--card-row-gap'?: string;
  '--card-column-gap'?: string;
  '--card-width'?: string;
  '--card-height'?: string;
};

export interface ICardItem extends ICardProps {
  id?: string;
}

export interface ICardComponentProps {
  cards: ICardItem[];
  maxCardsPerRow: number;
  reflowOption: ReflowOptionType;
  /** Space between cards on both axes. Numbers are pixels; CSS lengths and Fluent tokens also work. */
  gap?: number | string;
  /** Vertical space between rows. Overrides `gap` for this axis. */
  rowGap?: number | string;
  /** Horizontal space between cards. Overrides `gap` for this axis. */
  columnGap?: number | string;
  /** Preferred width in Static mode; base width before growing in Dynamic/Controlled modes. Numbers are pixels. */
  cardWidth?: number | string;
  /** Fixed card height. Numbers are pixels; omit to keep the existing responsive sizing. */
  cardHeight?: number | string;
}
