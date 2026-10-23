import { makeStyles, tokens } from '@fluentui/react-components';

const customScrollbar = {
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '12px',
    height: '6px'
  },
  '&::-webkit-scrollbar-thumb': {
    height: '5px',
    border: '3.5px solid transparent',
    backgroundClip: 'content-box',
    borderRadius: tokens.borderRadiusLarge,
    backgroundColor: tokens.colorNeutralStroke1
  },
  '&::-webkit-scrollbar-button': {
    width: 0,
    height: 0,
    display: 'none'
  },
  '&::-webkit-scrollbar-corner': {
    backgroundColor: 'transparent'
  }
} as const;

export const useStyles = makeStyles({
  app: {
    boxSizing: 'border-box',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: tokens.spacingHorizontalXXL,
    height: '100vh',
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground1
  },
  appBody: {
    height: '100%',
    width: '100%',
    display: 'flex',
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusXLarge,
    gap: tokens.spacingHorizontalL,
    '@media screen and (max-width: 640px)': {
      ...customScrollbar,
      flexDirection: 'column',
      flexGrow: 1
    }
  },
  exampleCardContainer: {
    ...customScrollbar,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadius3XLarge,
    boxShadow: tokens.shadow16,
    boxSizing: 'border-box',
    minWidth: 0,
    height: '100%',

    '@media screen and (max-width: 640px)': {
      height: '100%',
      overflowY: 'visible'
    }
  },
  controlPane: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadius3XLarge,
    boxShadow: tokens.shadow16,
    color: tokens.colorNeutralForeground1,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL,
    minWidth: '260px',
    maxWidth: '260px',
    paddingBlock: tokens.spacingVerticalL,
    paddingInline: tokens.spacingHorizontalM,
    '@media screen and (max-width: 640px)': {
      display: 'block',
      minWidth: '100%',
      flexGrow: 1
    }
  },
  paneHeader: {
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    paddingBottom: tokens.spacingVerticalL,
    width: '100%'
  },
  paneSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS
  },
  switchSection: {
    display: 'block',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS
  },
});
