import { Button } from '@material-ui/core';
import { useStyles } from './Account.styles';

export const Account = ({ accountId }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <span>{accountId}</span>
      <Button variant="outlined">Select</Button>
    </div>
  );
};
