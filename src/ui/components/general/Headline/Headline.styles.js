import { makeStyles } from '@material-ui/core';
import * as R from 'ramda'

const resolveCSSPropValue = (value) => (props) => R.propOr(null, value, props);

const styles = {
  main: {
    lineHeight: 'normal',
    textAlign: R.curry(resolveCSSPropValue) ('textAlign')
  },
  is1: {
    margin: 0,
    fontWeight: 900,
    fontSize: '34px',
  },
  is2: {},
  is3: {},
};

export const useStyles = makeStyles(styles, { name: 'Headline' });
