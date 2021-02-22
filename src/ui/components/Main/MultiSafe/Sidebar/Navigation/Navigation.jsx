import { useStyles } from './Navigation.styles';

export const Navigation = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div>Dashboard</div>
      <div>Members</div>
    </div>
  );
};
