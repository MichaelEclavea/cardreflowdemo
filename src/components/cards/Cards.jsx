import { useEffect, useRef, useState } from 'react';
import { css } from '@fluentui/react/lib/Utilities';
import styles from './cards.module.scss';

const Cards = ({ cardCount, reflowOption, sliderValue }) => {
  const cardContainerRef = useRef();
  const [cardList, setCardList] = useState([]);
  const [placeholderCount, setPlaceholderCount] = useState(0);
  let windowSize = window.innerWidth;

  useEffect(() => {
    _renderCardList()
  }, [cardCount, reflowOption]);

  useEffect(() => {
    if (reflowOption === 'Controlled') {
      _validatePlaceholders();
    }
  }, [sliderValue]);

  useEffect(() => {
    if (windowSize !== window.innerWidth) {
      windowSize = window.innerWidth;
    }
    return () => windowSize = null;
  }, [window.innerWidth])

  const _validatePlaceholders = () => {
    const currentCount = updateControlledCards();
    if (currentCount > placeholderCount) {
      return _renderCardList();
    }
    if (currentCount < placeholderCount) {
      if (!currentCount) {
        const tempCardListArray = cardList;
        const newTempCardArray = tempCardListArray.slice(0, -placeholderCount);
        setPlaceholderCount(currentCount);
        return setCardList(newTempCardArray);
      } else {
        const tempCardListArray = cardList;
        const cardCountToRemove = placeholderCount - currentCount;
        setPlaceholderCount(currentCount);
        const newTempCardArray = tempCardListArray.slice(0, -cardCountToRemove);
        return setCardList(newTempCardArray);
      }
    } else {
      return _renderCardList();
    }
  }

  // Placeholder(invisible) cards when in controlled reflow.
  const _cardPlaceHolderGenerator = () => {
    return (
      <div className={styles.cardPlaceHolder} key={Math.floor(Math.random() * 1000)} />
    )
  }

  // Generates total placeholder cards needed.
  const divisibleGenerator = (totalCount, maxCountInRow) => {
    const maxCardCount = totalCount + (maxCountInRow - totalCount % maxCountInRow) % maxCountInRow;
    return maxCardCount - totalCount;
  }

  const updateControlledCards = () => {
    let cardArea = null;
    if (windowSize > 640) {
      cardArea = 240 + 12; // Single card (flex-basis) + (left & right margins).
    } else {
      cardArea = 110 + 6;
    }
    const containerWidth = Math.floor(cardContainerRef.current.offsetWidth);
    const maxCardsInRow = Math.floor(containerWidth / cardArea);
    const placeholderCount = divisibleGenerator(cardCount, maxCardsInRow);
    return placeholderCount;
  }

  const _renderCardList = () => {
    const cardArray = [];
    for (let i = 0; i < cardCount; i++) {
      cardArray.push(
        <div key={`card-${i}`} className={css(styles.cardRoot, reflowOption !== 'Static' && styles.cardGrowOne)}>
          <strong>{i + 1}</strong>
        </div>
      )
    }
    if (reflowOption === 'Controlled') {
      return _renderPlaceholderCards(cardArray);
    }
    return setCardList(cardArray);
  }

  const _renderPlaceholderCards = (array) => {
    let placeholderArray = array;
    let placeholderCount = updateControlledCards();
    setPlaceholderCount(placeholderCount);

    if (!!placeholderCount) {
      while (placeholderCount !== 0) {
        placeholderArray.push(_cardPlaceHolderGenerator());
        --placeholderCount;
      }
    }

    return setCardList(placeholderArray);
  }

  return (
    <div
      ref={cardContainerRef}
      className={styles.cardContainer}
    >
      {cardList}
    </div>
  )
}

export default Cards;