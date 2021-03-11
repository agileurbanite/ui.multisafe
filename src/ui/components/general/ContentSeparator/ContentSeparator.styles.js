import * as R from 'ramda';
import { makeStyles } from '@material-ui/core';

const resolveCSSPropValue = (value) => (props) => R.propOr(null, value, props);
const styles = {
  divider: {
    backgroundColor: R.curry(resolveCSSPropValue)('bg'),
    opacity: 0.12,
    margin: R.curry(resolveCSSPropValue)('margin'),
    height: R.curry(resolveCSSPropValue)('height'),
    width: '100%',
  },
};

export const useStyles = makeStyles(styles, { name: 'ContentSeparator' });
