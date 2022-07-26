import { CardMedia } from '@material-ui/core';
import FailedToLoad from '@ui/images/failed_to_load.svg';
import { useMemo } from 'react';


export const NFTMedia = ({ nft, classes, autoPlay = false}) => {

    const [isVideo, mimeType] = useMemo(() => {
        let type;
        // check mediaUrl string for .webm or .mp4 endings (case-insensitive)
        if (nft.metadata.mediaUrl && nft.metadata.mediaUrl.match(/\.webm$/i)) type = 'webm';
        else if (nft.metadata.mediaUrl && nft.metadata.mediaUrl.match(/\.mp4$/i)) type = 'mp4';
        // if there is a mediaUrl and a truthy mimeType (webm or mp4), we have a video
        const video = !!nft.metadata.mediaUrl && type;
        return [video, type];
    }, [nft.metadata.mediaUrl]);

    return (
        <CardMedia>
            {isVideo ? (
                <video muted loop controls autoPlay={autoPlay} className={classes.media}>
                    <source
                        src={nft.metadata.mediaUrl}
                        type={`video/${mimeType}`}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.parentElement.setAttribute(
                                'poster',
                                FailedToLoad
                            );
                        }}
                    />
                </video>
            ) : (
                <img
                    alt={nft.metadata.title}
                    src={nft.metadata.mediaUrl}
                    className={classes.img}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = FailedToLoad;
                    }}
                />
            )}
        </CardMedia>
    );
};
