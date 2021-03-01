import * as R from 'ramda';
import { makeStyles } from '@material-ui/core';

const resolveCSSPropValue = (value) => (props) => R.propOr(null, value, props);
const styles = {
  main: {
    display: 'flex',
    lineHeight: '80px',
    width: '100%',
    fontSize: R.curry(resolveCSSPropValue)('size'),
    textAlign: R.curry(resolveCSSPropValue)('position'),
  },
};

export const useStyles = makeStyles(styles, { name: 'EmojiIcon' });
