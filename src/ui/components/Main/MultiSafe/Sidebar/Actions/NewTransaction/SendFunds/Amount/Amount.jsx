import { useState, useEffect } from 'react';
import { InputAdornment, Button, Select, MenuItem } from '@material-ui/core';
import { useStoreState } from 'easy-peasy';
import { formatNearAmount } from 'near-api-js/lib/utils/format';
import { Near } from '../../../../../../../general/icons/Near';
import { TextField } from '../../../../../../general/TextField/TextField';
import { formatNearBalance, formatOtherBalance, formatOtherAmountHumanReadable } from '../../../../../../../../../utils/format';
import { useStyles } from './Amount.styles';

const initState = {
  contractName: '',
  decimals: 0,
  name: '',
  symbol: '',
  tokenBalance: '',
}

export const Amount = ({ control, classNames, setValue, tokenName, setTokenName, hasError, errorMessage}) => {
  const balance = useStoreState((store) => store.multisafe.general.balance);
  const fungibleTokensBalances = useStoreState((store) => store.multisafe.general.fungibleTokensBalances);
  const fungibleTokensMetadata = useStoreState((s) => s.multisafe.general.fungibleTokensMetadata);
  const classes = useStyles();
  const [selectedToken, setSelectedToken] = useState(initState)

  useEffect(() => {
    // constructs a selectedToken needed to format max amount
    const token = tokenName !== 'near' ? 
      fungibleTokensBalances.find(({name}) => name === tokenName) : 
      initState;
      
    const selectedTokenMetadata = fungibleTokensMetadata[token.contractName];
    token.decimals = selectedTokenMetadata?.decimals;
    token.symbol = selectedTokenMetadata?.symbol;
    
    setSelectedToken(token);
  }, [tokenName])

  const sendMax = () => {
    if (tokenName === 'near') {
      setValue('amount', formatNearAmount(balance));
    }
    else {
      setValue('amount', formatOtherAmountHumanReadable(selectedToken))
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
                value={tokenName}
                onChange={(event) => setTokenName(event.target.value)}
              >
                <MenuItem value='near'>
                  <Near className={classes.icon} />
                  <span className={classes.adornmentText}>NEAR</span>
                </MenuItem>
                {fungibleTokensBalances &&
                 fungibleTokensMetadata &&
                 fungibleTokensBalances.map(({ contractName }) => 
                  <MenuItem 
                    key={contractName}
                    value={fungibleTokensMetadata[contractName].name}
                  >
                    {fungibleTokensMetadata[contractName].name}
                  </MenuItem>)}
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
        <span className={classes.balance}>{`Balance: ${tokenName === 'near' ? formatNearBalance(balance) : formatOtherBalance(selectedToken)}`}</span>
        <Button className={classes.sendMax} color="primary" onClick={sendMax}>
          Send Max
        </Button>
      </div>
    </>
  );
};
