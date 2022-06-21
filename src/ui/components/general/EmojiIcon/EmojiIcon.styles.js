import { makeStyles } from '@material-ui/core';
import * as R from 'ramda';

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
