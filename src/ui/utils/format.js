import * as R from 'ramda';

// Space 2 snake case
export const spaceToSnake = (str) => R.compose(R.join('_'), R.split(' '), R.trim, R.toLower)(str);
