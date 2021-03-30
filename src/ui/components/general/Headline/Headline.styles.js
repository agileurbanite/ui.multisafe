import { makeStyles } from '@material-ui/core';
import * as R from 'ramda';

const resolveCSSPropValue = (value) => (props) => R.propOr(null, value, props);

const styles = {
  main: {
    margin: 0,
    fontWeight: 900,
    lineHeight: 'normal',
    textAlign: R.curry(resolveCSSPropValue)('textAlign'),
  },
  is1: {
    fontSize: 34,
  },
  is3: {
    fontSize: 20,
  },
};

export const useStyles = makeStyles(styles, { name: 'Headline' });
