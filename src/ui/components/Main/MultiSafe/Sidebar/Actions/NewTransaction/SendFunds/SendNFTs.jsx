import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Paper } from '@material-ui/core';
import cn from 'classnames';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { forwardRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { transferNFTSchema } from '../../../../../../../../utils/validation/SendFundsModal';
import { Checkbox } from '../../../../../../general/Checkbox/Checkbox';
import { NFTCollection } from './Collection/NFTCollection';
import { Recipient } from './Recipient/Recipient';
import { useStyles } from './SendFunds.styles';

export const SendNFTs = forwardRef(({ onClose, tabIndex }, ref) => {
    const [tokenId, setTokenId] = useState('');
    const [contractName, setContractName] = useState('');
    
    const nonFungibleTokens = useStoreState(({ multisafe }) => multisafe.general.nonFungibleTokens);
    const onTransferNFT = useStoreActions((actions) => actions.multisafe.onTransferNFT);

    const { control, handleSubmit, errors } = useForm({
        resolver: yupResolver(transferNFTSchema),
        mode: 'all',
    });
    const classes = useStyles();

    const onSubmit = handleSubmit((data) => {
        onTransferNFT({ data, onClose, tokenId, contractName });
    });

    const onClick = ({id, contract}) => {
        setTokenId(id);
        setContractName(contract);
    };

    return (
        <Paper className={classes.container} ref={ref} tabIndex={tabIndex} elevation={5}>
            <div className={classes.wrapper}>
                <form className={classes.form} onSubmit={onSubmit}>
                    <Recipient
                        control={control}
                        classNames={classes}
                        hasError={!!errors?.recipientId}
                        errorMessage={!!errors?.recipientId && errors?.recipientId?.message}
                    />
                    {nonFungibleTokens && nonFungibleTokens.map((nftCollection) => 
                        <NFTCollection key={nftCollection.name} tokenId={tokenId} nftCollection={nftCollection} handleClick={onClick} classes={classes}/>)}
                    <Checkbox
                        control={control}
                        name="withApprove"
                        label="Approve transaction"
                        muiClasses={{ label: classes.checkboxLabel }}
                        defaultValue
                        color="primary"
                    />
                    <div className={classes.footer}>
                        <Button color="secondary" className={classes.cancel} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" color="primary" className={cn(classes.cancel, classes.send)}>
                            Send
                        </Button>
                    </div>
                </form>
            </div>
        </Paper>
    );
});
