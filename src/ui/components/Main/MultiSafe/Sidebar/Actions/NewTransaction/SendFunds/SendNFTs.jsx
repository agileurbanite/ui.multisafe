import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Paper } from '@material-ui/core';
import cn from 'classnames';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { forwardRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { transferNFTSchema } from '../../../../../../../../utils/validation/SendFundsModal';
import { Checkbox } from '../../../../../../general/Checkbox/Checkbox';
import { NFT } from './Collection/NFT';
import { NFTCollection } from './Collection/NFTCollection';
import { Recipient } from './Recipient/Recipient';
import { useStyles } from './SendFunds.styles';

const VIEWS = {
    CHOOSE_NFT: 'chooseNFT',
    CHOOSE_RECEIPIENT: 'chooseRecipient'
};

const TransferView = ({ nonFungibleTokens, currentView, setCurrentView, onClose, control, errors, classes, onClick, tokenId, contractName }) => {
    switch (currentView) {
        case VIEWS.CHOOSE_NFT: 
            return (
                <>
                    {nonFungibleTokens.length ? nonFungibleTokens.map((nftCollection) => 
                        <NFTCollection key={nftCollection.name} tokenId={tokenId} nftCollection={nftCollection} handleClick={onClick} classes={classes}/>) :
                        'No NFTs were loaded'
                    }
                    <div className={classes.footer}>
                        <Button color="secondary" className={classes.cancel} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="secondary" color="primary"  disabled={!tokenId} onClick={() => setCurrentView(VIEWS.CHOOSE_RECEIPIENT)} className={cn(classes.cancel, classes.send)}>
                            Next
                        </Button>
                    </div>
                </>
            );
        case VIEWS.CHOOSE_RECEIPIENT: {
            const collection = nonFungibleTokens.filter((nftCollection) => nftCollection.contractName === contractName);
            return (
                <>
                    <Recipient
                        control={control}
                        classNames={classes}
                        hasError={!!errors?.recipientId}
                        errorMessage={!!errors?.recipientId && errors?.recipientId?.message}
                    />
                    {
                        collection[0].tokens.map((nft) => nft.token_id === tokenId && 
                        <NFT key={nft.metadata.title} tokenId={tokenId} nftCollection={collection} nft={nft} classes={classes} handleClick={() => {}}/>)
                    }
                    <Checkbox
                        control={control}
                        name="withApprove"
                        label="Approve transaction"
                        muiClasses={{ label: classes.checkboxLabel }}
                        defaultValue
                        color="primary"
                    />
                    <div className={classes.footer}>
                        <Button color="secondary" className={classes.cancel} onClick={() => setCurrentView(VIEWS.CHOOSE_NFT)}>
                            Previous
                        </Button>
                        <Button type="submit" color="primary" className={cn(classes.cancel, classes.send)}>
                            Send
                        </Button>
                    </div>
                </>
            );
        }
        default:
            return null;
    }
};

export const SendNFTs = forwardRef(({ onClose, tabIndex }, ref) => {
    const [currentView, setCurrentView] = useState(VIEWS.CHOOSE_NFT);
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
                    {TransferView({ nonFungibleTokens, currentView, setCurrentView, onClose, control, errors, classes, onClick, tokenId, contractName })}
                </form>
            </div>
        </Paper>
    );
});
