import type * as React from 'react';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react';
import { mergeClasses } from '@fluentui/react-components';
import { useStyles } from './CardComponent.styles';
import { Card } from './card/Card';
import type {
  CardContainerStyleType,
  ICardComponentProps
} from './CardComponent.types';

const toCssLength = (value: number | string | undefined): string | undefined =>
  typeof value === 'number' ? `${Math.max(0, value)}px` : value;

export const CardComponent: React.FC<ICardComponentProps> = ({
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
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const [cardList, setCardList] = useState<React.ReactElement[]>([]);
  const [containerWidth, setContainerWidth] = useState(0);
  const [cardsInFirstRow, setCardsInFirstRow] = useState(0);

  const cardCount = cards.length;
  const containerStyle: CardContainerStyleType = {
    '--cards-per-row': maxCardsPerRow,
    '--card-row-gap': toCssLength(rowGap),
    '--card-column-gap': toCssLength(columnGap),
    '--card-width': toCssLength(cardWidth),
    '--card-height': toCssLength(cardHeight)
  };

  useEffect(() => {
    const container = cardContainerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      if (entry) {
        setContainerWidth(Math.floor(entry.contentRect.width));
      }
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const items = Array.from(cardContainerRef.current?.children ?? []).filter(
      (item): item is HTMLElement => item instanceof HTMLElement
    );
    if (!items.length) {
      setCardsInFirstRow(0);
      return;
    }
    const firstRowTop = items[0].offsetTop;
    setCardsInFirstRow(
      items.filter((item) => item.offsetTop === firstRowTop).length
    );
  }, [cardList, containerWidth, columnGap, maxCardsPerRow, cardWidth, cardHeight]);

  const _cardPlaceHolderGenerator = useCallback(
    (index: number) => {
      return (
        <span className={styles.cardPlaceHolder} key={`placeholder-${index}`} />
      );
    },
    [styles.cardPlaceHolder]
  );

  const divisibleGenerator = useCallback(
    (totalCount: number, maxCountInRow: number) => {
      const maxCardCount =
        totalCount +
        ((maxCountInRow - (totalCount % maxCountInRow)) % maxCountInRow);
      return maxCardCount - totalCount;
    },
    []
  );

  const updateControlledCards = useCallback(() => {
    if (!cardsInFirstRow || !cardCount) {
      return 0;
    }
    // A single row never needs placeholders, so cap row slots at the card count.
    const maxCardsInRow = Math.min(cardsInFirstRow, cardCount);
    const placeholderCount = divisibleGenerator(cardCount, maxCardsInRow);
    return placeholderCount;
  }, [cardCount, cardsInFirstRow, divisibleGenerator]);

  const _renderPlaceholderCards = useCallback(
    (array: React.ReactElement[]) => {
      const placeholderArray = array;
      let placeholderCount = updateControlledCards();

      if (!!placeholderCount) {
        while (placeholderCount !== 0) {
          placeholderArray.push(_cardPlaceHolderGenerator(placeholderCount));
          --placeholderCount;
        }
      }
      return setCardList(placeholderArray);
    },
    [_cardPlaceHolderGenerator, updateControlledCards]
  );

  const _renderCardList = useCallback(() => {
    const cardArray = cards.map((cardProps, i) => (
      <Card
        key={cardProps.id ?? `card-${i}`}
        {...cardProps}
        className={mergeClasses(
          styles.cardRoot,
          reflowOption !== 'static' && styles.cardGrowOne,
          cardProps.className
        )}
      />
    ));

    if (reflowOption === 'controlled') {
      return _renderPlaceholderCards(cardArray);
    }
    return setCardList(cardArray);
  }, [
    _renderPlaceholderCards,
    cards,
    reflowOption,
    styles.cardGrowOne,
    styles.cardRoot
  ]);

  useEffect(() => {
    _renderCardList();
  }, [_renderCardList]);

  return (
    <div
      ref={cardContainerRef}
      className={styles.cardContainer}
      style={containerStyle}
    >
      {cardList}
    </div>
  );
};
