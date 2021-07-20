import { useLocation } from 'react-router';
import { Account } from './Account/Account';
import { useStyles } from './SelectAccount.styles';

// TODO Rework as form + checkbox instead of button
export const SelectAccount = () => {
  const location = useLocation();
  const classes = useStyles();

  console.log(location);
  return (
    <div>
      <h1>Select account</h1>
      <div className={classes.accounts}>
        {location?.state?.accounts?.map((accountId) => (
          <Account key={accountId} accountId={accountId} />
        ))}
      </div>
    </div>
  );
};
