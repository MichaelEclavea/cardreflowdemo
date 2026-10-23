import type * as React from 'react';
import { mergeClasses } from '@fluentui/react-components';
import { Card } from './card/Card';
import type {
  GridCardContainerStyleType,
  IGridCardComponentProps
} from './GridCardComponent.types';
import { useStyles } from './GridCardComponent.styles';

const toCssLength = (value: number | string | undefined): string | undefined =>
  typeof value === 'number' ? `${Math.max(0, value)}px` : value;

export const GridCardComponent: React.FC<IGridCardComponentProps> = ({
  cards,
  maxCardsPerRow,
  reflowOption,
  gap,
  rowGap = gap,
  columnGap = gap,
  cardWidth,
  cardHeight
}) => {
  const styles = useStyles();
  const isControlled = reflowOption === 'controlled';
  const containerStyle: GridCardContainerStyleType = {
    '--cards-per-row': maxCardsPerRow,
    '--card-row-gap': toCssLength(rowGap),
    '--card-column-gap': toCssLength(columnGap),
    '--card-width': toCssLength(cardWidth),
    '--card-height': toCssLength(cardHeight)
  };

  return (
    <div
      className={mergeClasses(
        styles.cardContainer,
        isControlled && styles.controlledContainer
      )}
      style={containerStyle}
    >
      {cards.map((cardProps, index) => (
        <Card
          key={cardProps.id ?? `card-${index}`}
          {...cardProps}
          className={mergeClasses(
            styles.cardRoot,
            reflowOption === 'dynamic' && styles.cardGrowOne,
            isControlled && styles.controlledCard,
            cardProps.className
          )}
        />
      ))}
    </div>
  );
};
