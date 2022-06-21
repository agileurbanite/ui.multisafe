import { TableCell } from '@material-ui/core';

import { useStyles } from './Status.styles';

export const Status = ({ status }) => {
    const classes = useStyles({ status });
    return <TableCell className={classes.status}>{status}</TableCell>;
};
