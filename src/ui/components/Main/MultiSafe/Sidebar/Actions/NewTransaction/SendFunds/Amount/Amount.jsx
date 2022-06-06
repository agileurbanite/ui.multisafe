import { InputAdornment, Button, Select, MenuItem } from '@material-ui/core';
import { useStoreState } from 'easy-peasy';
import { formatNearAmount } from 'near-api-js/lib/utils/format';
import { Near } from '../../../../../../../general/icons/Near';
import { TextField } from '../../../../../../general/TextField/TextField';
import { formatNearBalance, formatOtherBalance, formatOtherBalanceWithoutSymbol } from '../../../../../../../../../utils/format';
import { useStyles } from './Amount.styles';

export const Amount = ({ control, classNames, setValue, token, setToken, hasError, errorMessage}) => {
  const balance = useStoreState((store) => store.multisafe.general.balance);
  const fungibleTokens = useStoreState((store) => store.multisafe.general.fungibleTokens);
  const classes = useStyles();
  const selectedToken = fungibleTokens.find(({name}) => name === token)
  const sendMax = () => {
    if (token === 'near') {
      setValue('amount', formatNearAmount(balance));
    }
    else {
      setValue('amount', formatOtherBalanceWithoutSymbol(selectedToken))
    }
  };

  return (
    <>
      <TextField
        control={control}
        name="amount"
        variant="outlined"
        placeholder="Amount*"
        fullWidth
        error={hasError}
        helperText={errorMessage}
        className={classes.textField}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={token}
                onChange={(event) => setToken(event.target.value)}
              >
                <MenuItem value='near'>
                  <Near className={classes.icon} />
                  <span className={classes.adornmentText}>NEAR</span>
                </MenuItem>
                {fungibleTokens.map(({ name }) => <MenuItem value={name}>{name}</MenuItem>)}
              </Select>
            </InputAdornment>
          ),
          classes: {
            root: classNames.textFieldInputRoot,
            notchedOutline: classNames.textFieldInputNotchedOutline,
          },
        }}
      />
      <div className={classes.helperContainer}>
        <span className={classes.balance}>{`Balance: ${token === 'near' ? formatNearBalance(balance) : formatOtherBalance(selectedToken)}`}</span>
        <Button className={classes.sendMax} color="primary" onClick={sendMax}>
          Send Max
        </Button>
      </div>
    </>
  );
};
