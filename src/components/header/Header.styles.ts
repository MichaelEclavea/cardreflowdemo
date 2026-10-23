import { makeStyles, tokens } from '@fluentui/react-components';

export const useStyles = makeStyles({
  appHeader: {
    marginBottom: tokens.spacingVerticalXXL,
    textAlign: 'left',
  },
  title: {
    // Preserve the demo's viewport-responsive heading size.
    fontSize: 'calc(1.5 * (10px + 2vmin))',
    lineHeight: tokens.lineHeightBase600,
  },
});
