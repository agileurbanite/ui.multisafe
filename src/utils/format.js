import Big from 'big.js';
import BN from 'bn.js';
import { utils } from 'near-api-js';
import * as R from 'ramda';


// Space 2 snake case
export const spaceToSnake = (str) => R.compose(R.join('_'), R.split(' '), R.trim, R.toLower)(str);
export const formatNearBalance = (balance) => `${utils.format.formatNearAmount(balance, 3)} NEAR`;
export const formatOtherBalance = ({tokenBalance, decimals, symbol}) => `${tokenBalance* 10**-decimals} ${symbol}`;
export const formatOtherAmountHumanReadable = ({tokenBalance, decimals}) => `${tokenBalance* 10**-decimals}`;

// Convert human readable amount to internal indivisible units
export const parseOtherAmount = ({decimals = 18}, value) => value && Big(value).times(Big(10).pow(decimals)).toFixed();

export const formatTGasValue = (tGas) => new BN(tGas * 10 ** 12).toString();
