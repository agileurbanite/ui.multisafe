import { TableCell } from '@material-ui/core';

import { OpenInExplorer } from '../../../general/OpenInExplorer/OpenInExplorer';
import { useStyles } from './Status.styles';

export const Status = ({ status, transactionHash}) => {
    const classes = useStyles({ status });
    return <TableCell className={classes.status}>
        {status}
        <OpenInExplorer
            classNames={{ iconButton: classes.openInExplorer, icon: classes.icon }}
            type="transaction"
            transactionHash={transactionHash}
        />
    </TableCell>;
};
