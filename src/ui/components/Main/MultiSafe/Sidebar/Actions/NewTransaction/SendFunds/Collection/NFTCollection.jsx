import { NFT } from './NFT';

export const NFTCollection = ({ tokenId, nftCollection, classes, handleClick }) => (
    <>
        {nftCollection.tokens.map((nft) => (
            <NFT 
                key={nft.metadata.title}
                tokenId={tokenId}
                nftCollection={nftCollection}
                nft={nft}
                handleClick={handleClick}
                classes={classes}
            />
        ))}
    </>
);
