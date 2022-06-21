import { TableCell } from '@material-ui/core';
import { CallMade } from '@material-ui/icons';

import { useStyles } from './Type.styles';

export const Type = () => {
    const classes = useStyles();
    return (
        <TableCell>
            <div className={classes.container}>
                <CallMade className={classes.icon} />
                <span>Outgoing transfer</span>
            </div>
        </TableCell>
    );
};
