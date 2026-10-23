import { Title2 } from '@fluentui/react-components';
import { useStyles } from './Header.styles';

export const Header = () => {
  const styles = useStyles();

  return (
    <header className={styles.appHeader}>
      <Title2 as="h2" className={styles.title}>FlexBox Card Reflow Demo</Title2>
    </header>
  );
};
