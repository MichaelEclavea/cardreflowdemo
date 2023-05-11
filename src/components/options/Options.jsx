import * as React from 'react';
import { ChoiceGroup } from '@fluentui/react/lib/ChoiceGroup';
import { Label } from '@fluentui/react/lib/Label';
import { Icon } from '@fluentui/react/lib/Icon';
import { Stack } from '@fluentui/react/lib/Stack';

const options = [
  { key: 'A', text: 'Static' },
  { key: 'B', text: 'Dynamic' },
  { key: 'C', text: 'Controlled' }
];

export const Options = ({ setReflowOption }) => {
  const _onChange = (ev, option) => {
    setReflowOption(option.text)
  }

  return (
    <div>
      <Label>
        <Stack horizontal verticalAlign="center">
          <span>Reflow Options&nbsp;&nbsp;</span>
          <Icon iconName="Filter" />
        </Stack>
      </Label>
      <ChoiceGroup
        horizontal
        defaultSelectedKey="A"
        options={options}
        onChange={_onChange}
        ariaLabelledBy={'Reflow options'}
      />
    </div>
  );
};
