import { Divider } from '@material-ui/core';

import { useStyles } from './ContentSeparator.styles';

export const ContentSeparator = ({ bg, height, margin }) => {
    const classes = useStyles({ bg, height, margin });
    return <Divider className={classes.divider} />;
};
