import {
  Avatar,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  IconButton,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { emoji as emojiConfig } from '../../../../../config/emoji';

export const Collection = ({ nftCollection, classes, handleClick }) => (
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
        <CardMedia
          className={classes.media}
        >
          <img className={classes.img} alt={nft.metadata.title} src={nft.metadata.mediaUrl}/>
        </CardMedia>
        <CardActions disableSpacing>
          <IconButton onClick={() => handleClick({id: nft.token_id, contract: nftCollection.contractName, title: nft.metadata.title })}>
            <SendIcon/>
          </IconButton>
        </CardActions>
      </Card>
    ))}
  </>
);
