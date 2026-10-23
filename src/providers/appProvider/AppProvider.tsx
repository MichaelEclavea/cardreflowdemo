import type * as React from 'react';
import { FluentProvider, webDarkTheme, webLightTheme } from '@fluentui/react-components';
import type { IAppProviderProps } from './AppProvider.types';

export const AppProvider: React.FC<IAppProviderProps> = ({ children, isLightTheme }) => (
  <FluentProvider theme={isLightTheme ? webLightTheme : webDarkTheme}>{children}</FluentProvider>
);
