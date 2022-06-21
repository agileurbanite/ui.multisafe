import { Grid, Modal } from '@material-ui/core';
import { useStoreState } from 'easy-peasy';
import { useState } from 'react';

import { TransferNFT } from './Actions/TransferNFT';
import { Collection } from './Collection/Collection';
import { useStyles } from './NonFungibleTokens.styles';

export const NonFungibleTokens = () => {
    const nonFungibleTokens = useStoreState(({ multisafe }) => multisafe.general.nonFungibleTokens);
    const classes = useStyles();

    const [tokenId, setTokenId] = useState('');
    const [tokenName, setTokenName] = useState('');
    const [contractName, setContractName] = useState('');

    const [isOpen, setOpen] = useState(false);
  
    const onOpen = ({id, title, contract}) => {
        setOpen(true);
        setTokenId(id);
        setTokenName(title);
        setContractName(contract);
    };
    const onClose = () => {
        setOpen(false);
        setTokenId('');
        setContractName('');
    };

    return (
        <div className={classes.container}>
            <h2 className={classes.header}>NFTs</h2>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                {nonFungibleTokens.map((nftCollection) => 
                    <Collection nftCollection={nftCollection} handleClick={onOpen} classes={classes}/>)}
            </Grid>
            <Modal open={isOpen} onClose={onClose} className={classes.modal}>
                <TransferNFT onClose={onClose} tokenId={tokenId} tokenName={tokenName} contractName={contractName}/>
            </Modal>
        </div>
    );
};
