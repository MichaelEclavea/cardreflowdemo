import { makeStyles, tokens } from '@fluentui/react-components';

const mobileBreakpoint = '@media screen and (max-width: 640px)';
const desktopRowGap = `var(--card-row-gap, calc(2 * ${tokens.spacingVerticalXS}))`;
const mobileRowGap = `var(--card-row-gap, calc(2 * ${tokens.spacingVerticalXXS}))`;
const desktopColumnGap = `var(--card-column-gap, calc(2 * ${tokens.spacingHorizontalXS}))`;
const mobileColumnGap = `var(--card-column-gap, calc(2 * ${tokens.spacingHorizontalXXS}))`;
const desktopCardWidth = 'var(--card-width, 240px)';
const mobileCardWidth = 'var(--card-width, 110px)';
const desktopCardMinHeight = 'var(--card-height, 160px)';
const mobileCardHeight = 'var(--card-height, 80px)';
// Divide the available row width after accounting for the gaps between slots.
const desktopCardBasis = `max(${desktopCardWidth}, calc((100% + ${desktopColumnGap}) / var(--cards-per-row) - ${desktopColumnGap}))`;
const mobileCardBasis = `max(${mobileCardWidth}, calc((100% + ${mobileColumnGap}) / var(--cards-per-row) - ${mobileColumnGap}))`;

export const useStyles = makeStyles({
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    height: 'auto',
    maxWidth: '100%',
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalM}`,
    rowGap: desktopRowGap,
    columnGap: desktopColumnGap,
    [mobileBreakpoint]: {
      rowGap: mobileRowGap,
      columnGap: mobileColumnGap
    }
  },

  cardRoot: {
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadius2XLarge,
    display: 'flex',
    flexBasis: desktopCardWidth,
    height: 'var(--card-height, auto)',
    minHeight: desktopCardMinHeight,
    width: desktopCardWidth,

    ':hover': {
      boxShadow: tokens.shadow16
    },

    [mobileBreakpoint]: {
      flexBasis: mobileCardWidth,
      height: mobileCardHeight,
      minHeight: mobileCardHeight,
      width: mobileCardWidth
    }
  },

  cardGrowOne: {
    flexGrow: 1,
    flexBasis: desktopCardBasis,

    [mobileBreakpoint]: {
      flexBasis: mobileCardBasis
    }
  },

  cardPlaceHolder: {
    borderRadius: tokens.borderRadius2XLarge,
    flexBasis: desktopCardBasis,
    flexGrow: 1,
    height: desktopCardMinHeight,
    width: desktopCardWidth,

    [mobileBreakpoint]: {
      flexBasis: mobileCardBasis,
      flexGrow: 1,
      height: mobileCardHeight,
      width: mobileCardWidth
    }
  }
});
