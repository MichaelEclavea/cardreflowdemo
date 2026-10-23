import type * as React from 'react';
import { useEffect } from 'react';
import { Body1, Label, Slider, useId } from '@fluentui/react-components';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useStyles } from './SliderController.styles';
import type { ISliderControllerProps } from './SliderController.types';

export const SliderController: React.FC<ISliderControllerProps> = ({ value, onChange }) => {
  const styles = useStyles();
  const sliderId = useId('container-width');
  const isMobile = useMediaQuery('(max-width: 640px)');
  const min = isMobile ? 20 : 7;

  useEffect(() => {
    if (value < min) onChange(min);
  }, [min, onChange, value]);

  return (
    <div className={styles.root}>
      <Label htmlFor={sliderId} weight="semibold">Container width adjuster</Label>
      <div className={styles.sliderRow}>
        <Slider
          id={sliderId}
          className={styles.sliderControl}
          min={min}
          max={100}
          value={value}
          aria-valuetext={`${value} percent`}
          onChange={(_, data) => onChange(data.value)}
        />
        <Body1 aria-hidden="true">{value}%</Body1>
      </div>
    </div>
  );
};
