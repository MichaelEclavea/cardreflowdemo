import { makeStyles, tokens } from '@fluentui/react-components';

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
    textAlign: 'left',
  },
  sliderRow: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
  },
  sliderControl: {
    flexGrow: 1,
    minWidth: 0,
    cursor: 'pointer',
    textAlign: 'left',
  },
});
