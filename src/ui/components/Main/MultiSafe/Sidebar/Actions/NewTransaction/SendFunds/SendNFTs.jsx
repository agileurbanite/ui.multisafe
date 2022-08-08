import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import { Checkbox } from '@ui/components/general/Checkbox/Checkbox';
import { transferNFTSchema } from '@utils/validation/SendFundsModal';
import cn from 'classnames';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { forwardRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import isValidNearAccount from '@utils/isValidNearAccount';
import { useWalletSelector } from '@ui/providers/WalletSelectorProvider/WalletSelectorProvider';
import FormButton from '../../../../../FormElements/FormButton/FormButton';
import { NFT } from './Collection/NFT';
import { NFTCollection } from './Collection/NFTCollection';
import { Recipient } from './Recipient/Recipient';
import { useStyles } from './SendFunds.styles';

const VIEWS = {
    CHOOSE_NFT: 'chooseNFT',
    CHOOSE_RECIPIENT: 'chooseRecipient'
};

const TransferView = ({ nonFungibleTokens, currentView, setCurrentView, onClose, control, errors, isValid, isDirty, classes, onClick, tokenId, contractName }) => {
    switch (currentView) {
        case VIEWS.CHOOSE_NFT: {
            const onClickNext = () => setCurrentView(VIEWS.CHOOSE_RECIPIENT);
            return (
                <>
                    {nonFungibleTokens.length ? nonFungibleTokens.map((nftCollection) => 
                        <NFTCollection 
                            key={nftCollection.name}
                            tokenId={tokenId}
                            nftCollection={nftCollection}
                            handleClick={onClick}
                            classes={classes}
                        />) :
                        'No NFTs were loaded'
                    }
                    <div className={classes.footer}>
                        <Button 
                            color="secondary"
                            className={classes.cancel}
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="secondary"
                            color="primary"
                            disabled={!tokenId}
                            onClick={onClickNext}
                            className={cn(classes.cancel, classes.send)}
                        >
                            Next
                        </Button>
                    </div>
                </>
            );
        }
        case VIEWS.CHOOSE_RECIPIENT: {
            const onClickBack = () => setCurrentView(VIEWS.CHOOSE_NFT);
            const collection = nonFungibleTokens.filter((nftCollection) => nftCollection.contractName === contractName);
            return (
                <>
                    <Recipient
                        control={control}
                        classNames={classes}
                        hasError={!!errors?.recipientId}
                        errorMessage={errors?.recipientId?.message}
                    />
                    {
                        collection?.[0]?.tokens?.map((nft) => nft.token_id === tokenId && 
                        <NFT key={nft.metadata.title} tokenId={tokenId} nftCollection={collection} nft={nft} classes={classes} />)
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
                        <Button 
                            color="secondary"
                            className={classes.cancel}
                            onClick={onClickBack}
                        >
                            Previous
                        </Button>
                        <FormButton disabled={!isValid || !isDirty} className={cn(classes.cancel, classes.send)}>
                            Send
                        </FormButton>
                    </div>
                </>
            );
        }
        default:
            return null;
    }
};

export const SendNFTs = forwardRef(({ onClose, tabIndex }, ref) => {
    const { selector, selectedWalletId } = useWalletSelector();
    const [currentView, setCurrentView] = useState(VIEWS.CHOOSE_NFT);
    const [tokenId, setTokenId] = useState('');
    const [contractName, setContractName] = useState('');
    
    const nonFungibleTokens = useStoreState(({ multisafe }) => multisafe.general.nonFungibleTokens);
    const onTransferNFT = useStoreActions((actions) => actions.multisafe.onTransferNFT);

    const { control, handleSubmit, reset, setError, setFocus, formState: { errors, isValid, isDirty } } = useForm({
        resolver: yupResolver(transferNFTSchema),
        mode: 'all',
    });
    const classes = useStyles();


    const onSubmit = handleSubmit(async (data) => {
        const isAccountValid = await isValidNearAccount(data.recipientId);
        if (!isAccountValid) {
            setError('recipientId', {message: 'Oops! The user does not exist :('});
            setFocus('recipientId');
            return;
        }
        
        onTransferNFT({ data, onClose, tokenId, selector, selectedWalletId, contractName });
        reset(data);
    });

    const onClick = ({id, contract}) => {
        setTokenId(id);
        setContractName(contract);
        setCurrentView(VIEWS.CHOOSE_RECIPIENT);
    };

    return (
        <div className={classes.wrapper}>
            <form className={classes.form} onSubmit={onSubmit}>
                {TransferView({ nonFungibleTokens, currentView, setCurrentView, onClose, control, errors, isValid, isDirty, classes, onClick, tokenId, contractName })}
            </form>
        </div>
    );
});
