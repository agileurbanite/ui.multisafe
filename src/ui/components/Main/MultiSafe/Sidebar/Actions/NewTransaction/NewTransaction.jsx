import { Button, Modal, Menu, MenuItem } from '@material-ui/core';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useState } from 'react';

import { MakeFunctionCall } from './MakeFunctionCall/MakeFunctionCall';
import { useStyles } from './NewTransaction.styles';
import { TransferWrapper } from './SendFunds/TransferWrapper';

const TYPE = {
    TRANSFER: 'transfer',
    MAKE_FUNCTION_CALL: 'makeFunctionCall',
};

export const NewTransaction = () => {
    const multisafeId = useStoreState((s) => s.multisafe.general.multisafeId);
    const fetchFungibleTokens = useStoreActions((actions) => actions.multisafe.onMountTokenList);
    const fetchNonFungibleTokens = useStoreActions((actions) => actions.multisafe.onMountNonFungibleTokenList);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const [transactionType, setTransactionType] = useState('');
    const classes = useStyles();

    const onOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const onCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleSetTransactionType = (type) => {
        setTransactionType(type);
        onCloseMenu();
        if (type === TYPE.TRANSFER) {
            fetchFungibleTokens(multisafeId);
            fetchNonFungibleTokens(multisafeId);
        }
    };

    const onCloseTransaction = () => {
        setTransactionType('');
    };

    return (
        <>
            <Button
                onClick={onOpenMenu}
                variant='contained'
                color='primary'
                className={classes.button}
                id='basic-button'
                aria-controls={isMenuOpen ? 'basic-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={isMenuOpen ? 'true' : undefined}
            >
                New Transaction
            </Button>
            <Menu
                open={isMenuOpen}
                onClose={onCloseMenu}
                id='basic-menu'
                anchorEl={anchorEl}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => handleSetTransactionType(TYPE.TRANSFER)}>Transfer</MenuItem>
                <MenuItem onClick={() => handleSetTransactionType(TYPE.MAKE_FUNCTION_CALL)}>Custom Function</MenuItem>
            </Menu>
            <Modal open={!!transactionType} onClose={onCloseTransaction} className={classes.modal}>
                <div>
                    <TransactionType
                        type={transactionType}
                        onClose={onCloseTransaction}
                    />
                </div>
            </Modal>
        </>
    );
};

const TransactionType = ({ type, onClose }) => {
    switch (type) {
        case TYPE.TRANSFER:
            return <TransferWrapper onClose={onClose} />;
        case TYPE.MAKE_FUNCTION_CALL:
            return <MakeFunctionCall onClose={onClose} />;
        default:
            return <MakeFunctionCall onClose={onClose} />;
    };
};
