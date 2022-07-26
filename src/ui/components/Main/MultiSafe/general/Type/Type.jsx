import { TableCell } from '@material-ui/core';
import { MULT_SIG_REQUEST_ACTIONS } from '@utils/multiSegRequestActions';

import { useStyles } from './Type.styles';

export const Type = ({ type }) => {
    const classes = useStyles();
    const {
        label = type,
        icon: Icon,
    } = MULT_SIG_REQUEST_ACTIONS[type] || {};

    return (
        <TableCell>
            <div className={classes.container}>
                { Icon && <Icon className={classes.icon} /> }
                <span> {label} </span>
            </div>
        </TableCell>
    );
};
