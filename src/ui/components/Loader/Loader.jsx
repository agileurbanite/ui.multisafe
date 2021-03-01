import { useStyles } from './Loader.styles';

export const Loader = () => {
  const classes = useStyles();
  return <div className={classes.container}>Loading</div>;
};
