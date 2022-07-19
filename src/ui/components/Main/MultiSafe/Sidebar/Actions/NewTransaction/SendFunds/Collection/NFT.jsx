import { ListItem, ListItemText } from '@material-ui/core';

import { NFTMedia } from '../../../../../NonFungibleTokens/Collection/NFTMedia';
import {useStyles} from './NFT.styles';

export const NFT = ({ tokenId, nftCollection, nft, handleClick }) => {
    const classes = useStyles({isActive: tokenId === nft.token_id});
    const onClick = () => handleClick &&
        handleClick({id: nft.token_id, contract: nftCollection.contractName, title: nft.metadata.title });
    return (
        <ListItem key={nft.metadata.title} className={classes.listItem} onClick={onClick}
        >
            <ListItemText primary={nft.metadata.title} secondary={nftCollection.name} />
            <NFTMedia classes={classes} nft={nft} />
        </ListItem>
    );
};
