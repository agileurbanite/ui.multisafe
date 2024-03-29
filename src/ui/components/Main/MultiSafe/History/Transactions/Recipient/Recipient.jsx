import { TableCell } from '@material-ui/core';

import { CopyToClipboard } from '../../../general/CopyToClipboard/CopyToClipboard';
import { OpenInExplorer } from '../../../general/OpenInExplorer/OpenInExplorer';
import { useStyles } from './Recipient.styles';

export const Recipient = ({ recipient }) => {
    const classes = useStyles();
    return (
        <TableCell>
            <span>{recipient}</span>
            <CopyToClipboard
                accountId={recipient}
                classNames={{ iconButton: classes.copyToClipboard, icon: classes.icon }}
            />
            <OpenInExplorer
                accountId={recipient}
                classNames={{ iconButton: classes.openInExplorer, icon: classes.icon }}
            />
        </TableCell>
    );
};
