import * as R from 'ramda';
import { makeStyles } from '@material-ui/core';

const resolveCSSPropValue = (value) => (props) => R.propOr(null, value, props);
const styles = {
  main: {
    backgroundColor: R.curry(resolveCSSPropValue)('bg'),
    opacity: 0.12,
    margin: '0 0 0 16px',
    height: R.curry(resolveCSSPropValue)('height'),
  },
};

export const useStyles = makeStyles(styles, { name: 'ContentSeparator' });
