import { Sidebar } from './Sidebar/Sidebar';
import { useStyles } from './MultiSafe.styles';

export const MultiSafe = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Sidebar />
      <div className={classes.content}>MultiSafe</div>
    </div>
  );
};
