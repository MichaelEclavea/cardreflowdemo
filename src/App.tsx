import type * as React from 'react';
import { useState } from 'react';
import {
  Divider,
  Field,
  Radio,
  RadioGroup,
  Subtitle2Stronger,
  Switch
} from '@fluentui/react-components';
import type { SwitchOnChangeData } from '@fluentui/react-components';
import { Counter } from './components/counter/Counter';
import { Options } from './components/options/Options';
import { useStyles } from './App.styles';
import { CardComponent } from './components/cardComponent/CardComponent';
import { GridCardComponent } from './components/gridCardComponent/GridCardComponent';
import type { CardImplementationType } from './App.types';
import { Header } from './components/header/Header';
import { SliderController } from './components/slider/SliderController';
import type {
  ICardItem,
  ReflowOptionType
} from './components/cardComponent/CardComponent.types';
import {
  Delete20Regular,
  Open20Regular,
  Share20Regular
} from '@fluentui/react-icons';
import { AppProvider } from './providers/appProvider/AppProvider';

const getMoreOptions = (cardNumber: number) => [
  {
    key: 'open',
    label: 'Open',
    icon: <Open20Regular />,
    onClick: () => alert(`Open card ${cardNumber}`)
  },
  {
    key: 'share',
    label: 'Share',
    icon: <Share20Regular />,
    onClick: () => alert(`Share card ${cardNumber}`)
  },
  {
    key: 'delete',
    label: 'Delete',
    icon: <Delete20Regular />,
    onClick: () => alert(`Delete card ${cardNumber}`)
  }
];

const demoCards: ICardItem[] = Array.from({ length: 10 }, (_, i) => ({
  id: `card-id-${i + 1}`,
  header: `Card ${i + 1}`,
  description: 'Flexbox reflow demo card',
  moreOptions: getMoreOptions(i + 1),
  preview: {
    image: { src: `https://picsum.photos/seed/card-${i + 1}/480/270` }
  }
}));

export const App: React.FC = () => {
  const styles = useStyles();

  const [isLightTheme, setIsLightTheme] = useState(true);
  const [maxCardsPerRow, setMaxCardsPerRow] = useState(5);
  const [cardCount, setCardCount] = useState(demoCards.length);
  const [cardImplementation, setCardImplementation] =
    useState<CardImplementationType>('flexbox');
  const [reflowOption, setReflowOption] = useState<ReflowOptionType>('static');
  const [sliderValue, setSliderValue] = useState(100);
  const CardsComponent = cardImplementation === 'grid' ? GridCardComponent : CardComponent;

  const renderComponentPane = () => {
    return (
      <div className={styles.controlPane}>
        <Subtitle2Stronger as='h2' align='start' className={styles.paneHeader}>
          Demo Controls
        </Subtitle2Stronger>
        <div className={styles.switchSection}>
          <Switch
            style={{ display: 'flex' }}
            label={isLightTheme ? 'Dark theme' : 'Light theme'}
            checked={isLightTheme}
            onChange={(
              _ev: React.ChangeEvent<HTMLInputElement>,
              data: SwitchOnChangeData
            ) => setIsLightTheme(data.checked)}
          />
          <Divider />
        </div>
        <div className={styles.paneSection}>
          <SliderController value={sliderValue} onChange={setSliderValue} />
          <Divider />
        </div>
        <div className={styles.paneSection}>
          <Field label={{ children: 'Card implementation', weight: 'semibold' }}>
            <RadioGroup
              value={cardImplementation}
              onChange={(_, data) => {
                if (data.value === 'flexbox' || data.value === 'grid') {
                  setCardImplementation(data.value);
                }
              }}
            >
              <Radio value='flexbox' label='Original (Flexbox)' />
              <Radio value='grid' label='Alternative (Grid)' />
            </RadioGroup>
          </Field>
          <Divider />
        </div>
        <div className={styles.paneSection}>
          <Options value={reflowOption} onChange={setReflowOption} />
          <Divider />
        </div>
        <div className={styles.paneSection}>
          <Counter
            label={'Max cards per row'}
            onChange={setMaxCardsPerRow}
            value={maxCardsPerRow}
            min={1}
            max={demoCards.length}
          />
          <Divider />
        </div>
        <div className={styles.paneSection}>
          <Counter
            label='Visible cards'
            onChange={setCardCount}
            value={cardCount}
            min={0}
            max={demoCards.length}
          />
        </div>
      </div>
    );
  };

  return (
    <AppProvider isLightTheme={isLightTheme}>
      <div className={styles.app}>
        <Header />
        <div className={styles.appBody}>
          {renderComponentPane()}
          <div
            className={styles.exampleCardContainer}
            role='region'
            aria-label='Card preview'
            style={{ width: `${sliderValue}%` }}
          >
            <CardsComponent
              cards={demoCards.slice(0, cardCount)}
              maxCardsPerRow={maxCardsPerRow}
              reflowOption={reflowOption}
              rowGap={12}
              columnGap={12}
            />
          </div>
        </div>
      </div>
    </AppProvider>
  );
};
