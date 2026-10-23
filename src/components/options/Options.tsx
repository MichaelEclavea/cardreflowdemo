import type * as React from 'react';
import { Field, Radio, RadioGroup } from '@fluentui/react-components';
import type { RadioGroupProps } from '@fluentui/react-components';
import type { IOptionsProps } from './Options.types';

export const Options: React.FC<IOptionsProps> = ({ value, onChange }) => {
  const handleChange: NonNullable<RadioGroupProps['onChange']> = (_, data) => {
    if (data.value === 'static' || data.value === 'dynamic' || data.value === 'controlled') {
      onChange(data.value);
    }
  };

  return (
    <Field label={{ children: 'Reflow Options', weight: 'semibold' }}>
      <RadioGroup value={value} onChange={handleChange}>
        <Radio value="static" label="Static" />
        <Radio value="dynamic" label="Dynamic" />
        <Radio value="controlled" label="Controlled" />
      </RadioGroup>
    </Field>
  );
};
