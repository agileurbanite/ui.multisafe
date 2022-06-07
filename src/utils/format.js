import * as R from 'ramda';
import { utils } from 'near-api-js';

// Space 2 snake case
export const spaceToSnake = (str) => R.compose(R.join('_'), R.split(' '), R.trim, R.toLower)(str);
export const formatNearBalance = (balance) => `${utils.format.formatNearAmount(balance, 3)} NEAR`;
export const formatOtherBalance = ({tokenBalance, decimals, symbol}) => `${tokenBalance* 10**-decimals} ${symbol}`;
export const formatOtherAmount = ({tokenBalance, decimals}) => `${tokenBalance* 10**-decimals}`;
