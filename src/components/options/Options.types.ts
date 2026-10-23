import type { ReflowOptionType } from '../cardComponent/CardComponent.types';

export interface IOptionsProps {
  value: ReflowOptionType;
  onChange: (value: ReflowOptionType) => void;
}
