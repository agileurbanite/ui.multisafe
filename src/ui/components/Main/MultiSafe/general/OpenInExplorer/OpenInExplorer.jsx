import { IconButton, Tooltip } from '@material-ui/core';
import { OpenInNew } from '@material-ui/icons';

import { config } from '../../../../../../near/config';

const getExplorerLink = ({ accountId, type, transactionHash }) => {
    const getAccountInExplorerUrl =  (accountId) => `${config.explorerUrl}/accounts/${accountId}`;
    const getTransactionInExplorerUrl = (transactionHash) => `${config.explorerUrl}/transactions/${transactionHash}`;

    switch (type) {
        case 'account':
            return getAccountInExplorerUrl(accountId);
        case 'transaction':
            return getTransactionInExplorerUrl(transactionHash);
        default:
            return null;
    }
};

export const OpenInExplorer = ({ accountId, transactionHash, classNames, type = 'account' }) => {
    const linkToExplorer = getExplorerLink({ accountId, transactionHash, type });

    return (
        <IconButton className={classNames?.iconButton}>
            <a href={linkToExplorer} target="_blank" rel="noreferrer">
                <Tooltip title={`View ${type} in explorer`} placement="top">
                    <OpenInNew className={classNames?.icon} />
                </Tooltip>
            </a>
        </IconButton>
    );
};
