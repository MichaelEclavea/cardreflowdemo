import type * as React from 'react';

export interface ICounterProps {
  label: string;
  max: number;
  min: number;
  value: number;
  onChange: React.Dispatch<React.SetStateAction<number>>;
}
