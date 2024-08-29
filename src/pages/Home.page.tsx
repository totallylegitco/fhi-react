import { Box } from '@mantine/core';
import { Welcome } from '../components/Welcome/Welcome';
import classes from './styles.module.css';

export function HomePage() {
  return (
    <div className={classes.homePage}>
      <Box className={classes.contentBox}>
        <div className={classes.snapSection}>
          <Welcome />
        </div>
        <div className={classes.snapSection}>section</div>
        <div className={classes.snapSection}>section</div>
        <div className={classes.snapSection}>section</div>
      </Box>

      {/* <Welcome /> */}
    </div>
  );
}
