import { Navigation } from './Navigation/Navigation';
import { NewTransaction } from './NewTransaction/NewTransaction';
import { useStyles } from './Sidebar.styles';

export const Sidebar = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.topWrapper}>
        <NewTransaction />
      </div>
      <hr className={classes.separator} />
      <Navigation />
    </div>
  );
};
