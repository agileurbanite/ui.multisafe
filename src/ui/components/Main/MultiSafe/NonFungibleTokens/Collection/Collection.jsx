import {
  Avatar,
  Card,
  CardActions,
  CardHeader,
  IconButton,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { emoji as emojiConfig } from '../../../../../config/emoji';
import { NFTMedia } from './NFTMedia';

export const Collection = ({ nftCollection, classes, handleClick }) => { 
  return (
    <>
      {nftCollection.tokens.map((nft) => (
        <Card key={nft.metadata.title} className={classes.root}>
          <CardHeader
            avatar={
              <Avatar className={classes.avatar}>
                {emojiConfig.foxMuzzle}
              </Avatar>
            }
            title={nft.metadata.title}
            subheader={nftCollection.name}
          />
          <NFTMedia classes={classes} nft={nft} />
          <CardActions disableSpacing>
            <IconButton onClick={() => handleClick({id: nft.token_id, contract: nftCollection.contractName, title: nft.metadata.title })}>
              <SendIcon/>
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </>
  );
}
