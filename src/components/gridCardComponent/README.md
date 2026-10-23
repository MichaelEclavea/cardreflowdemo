# GridCardComponent

Copy this entire folder into a React/TypeScript project. All application imports
stay inside this folder; the original `cardComponent` folder is not required.

Install the Fluent UI dependencies in the destination project:

```sh
npm install @fluentui/react-components @fluentui/react-icons
```

The demo uses Fluent UI React v9 and Fluent UI React Icons v2. React and React DOM
are peer dependencies; use versions supported by the installed Fluent packages.

Render within a `FluentProvider`. If your application already provides one,
use that provider and its theme:

```tsx
import type * as React from 'react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { GridCardComponent } from './components/gridCardComponent/GridCardComponent';
import type { IGridCardItemProps } from './components/gridCardComponent/GridCardComponent.types';

const cards: IGridCardItemProps[] = [
  { id: 'first', header: 'First card', description: 'Card details' },
  { id: 'second', header: 'Second card', children: 'Custom card content' }
];

export const App: React.FC = () => (
  <FluentProvider theme={webLightTheme}>
    <GridCardComponent
      cards={cards}
      maxCardsPerRow={3}
      reflowOption='controlled'
      gap={12}
    />
  </FluentProvider>
);
```

## Layout options

- `static`: fixed card widths in a wrapping flex layout.
- `dynamic`: cards expand independently to fill each flex row.
- `controlled`: responsive Grid columns keep incomplete rows aligned.

`maxCardsPerRow` should be a positive integer. Optional `gap`, `rowGap`,
`columnGap`, `cardWidth`, and `cardHeight` accept pixel numbers or CSS lengths.
Axis-specific gaps override `gap`. Omit sizing props for the existing desktop
and mobile defaults. No global stylesheet, resize observer, or demo controls
are required.

Import `IGridCardComponentProps`, `IGridCardItemProps`, and `ReflowOptionType` from
`GridCardComponent.types.ts`. Per-card props and the menu/preview contracts are
available in `card/Card.types.ts`.
