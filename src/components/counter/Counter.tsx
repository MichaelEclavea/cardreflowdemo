import type * as React from 'react';
import { Body1Strong, Button, useId } from '@fluentui/react-components';
import { Add20Regular, Subtract20Regular } from '@fluentui/react-icons';
import { useStyles } from './Counter.styles';
import type { ICounterProps } from './Counter.types';

export const Counter: React.FC<ICounterProps> = ({
  label,
  value,
  min,
  max,
  onChange
}) => {
  const styles = useStyles();
  const labelId = useId('card-generator');

  return (
    <div className={styles.root} role='group' aria-labelledby={labelId}>
      <Body1Strong id={labelId}>{label}</Body1Strong>

      <div className={styles.controls}>
        <Button
          appearance='transparent'
          icon={<Subtract20Regular />}
          aria-label='Decrease card'
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
        />

        <Body1Strong role='status' aria-label='Card count'>
          {value}
        </Body1Strong>

        <Button
          appearance='transparent'
          icon={<Add20Regular />}
          aria-label='Increase card'
          disabled={value >= max}
          onClick={() => onChange(Math.max(min, value + 1))}
        />
      </div>
    </div>
  );
};
