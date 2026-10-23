import { makeStyles, tokens } from '@fluentui/react-components';

// const mobileBreakpoint = '@media screen and (max-width: 640px)';

export const useStyles = makeStyles({
  caption: {
    color: tokens.colorNeutralForeground3,
  },

  smallRadius: { borderRadius: tokens.borderRadiusSmall },

  // Fixed-height preview so cards stay the same height regardless of their width.
  // CardPreview already sizes its child image to 100% x 100%.
  previewContainer: {
    height: '120px',
  },

  previewImage: {
    objectFit: 'cover',
  },

  grayBackground: {
    backgroundColor: tokens.colorNeutralBackground3,
  },

  logoBadge: {
    padding: '5px',
    borderRadius: tokens.borderRadiusSmall,
    backgroundColor: '#FFF',
    boxShadow:
      '0px 1px 2px rgba(0, 0, 0, 0.14), 0px 0px 2px rgba(0, 0, 0, 0.12)',
  },

  actions: {
    display: 'flex',
  },
});
