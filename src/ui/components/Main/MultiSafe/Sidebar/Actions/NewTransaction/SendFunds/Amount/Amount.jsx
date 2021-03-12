import { InputAdornment, Button } from '@material-ui/core';
import { useStoreState } from 'easy-peasy';
import { formatNearAmount } from 'near-api-js/lib/utils/format';
import { Near } from '../../../../../../../general/icons/Near';
import { TextField } from '../../../../../../general/TextField/TextField';
import { formatNearBalance } from '../../../../../../../../../utils/format';
import { useStyles } from './Amount.styles';

export const Amount = ({ control, classNames, setValue }) => {
  const balance = useStoreState((store) => store.multisafe.general.balance);
  const classes = useStyles();

  const sendMax = () => setValue('amount', formatNearAmount(balance));

  return (
    <>
      <TextField
        control={control}
        name="amount"
        variant="outlined"
        placeholder="Amount*"
        fullWidth
        className={classes.textField}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Near className={classes.icon} />
              <span className={classes.adornmentText}>NEAR</span>
            </InputAdornment>
          ),
          classes: {
            root: classNames.textFieldInputRoot,
            notchedOutline: classNames.textFieldInputNotchedOutline,
          },
        }}
      />
      <div className={classes.helperContainer}>
        <span className={classes.balance}>{`Balance: ${formatNearBalance(balance)}`}</span>
        <Button className={classes.sendMax} color="primary" onClick={sendMax}>
          Send Max
        </Button>
      </div>
    </>
  );
};
