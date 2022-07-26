import { CopyToClipboard } from '@ui/components/Main/MultiSafe/general/CopyToClipboard/CopyToClipboard';
import { OpenInExplorer } from '@ui/components/Main/MultiSafe/general/OpenInExplorer/OpenInExplorer';

import { useStyles } from './Actions.styles';

export const Actions = ({ accountId }) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={classes.tools}>
                <CopyToClipboard classNames={{ icon: classes.icon }} accountId={accountId} />
                <OpenInExplorer
                    classNames={{ icon: classes.icon }}
                    accountId={accountId}
                />
            </div>
        </div>
    );
};
