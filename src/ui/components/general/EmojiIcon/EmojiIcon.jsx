import cn from 'classnames';

import { useStyles } from './EmojiIcon.styles';

export const EmojiIcon = ({ position, size, elem, content }) => {
    const classes = useStyles({ position, size });
    const Emoji = elem || 'p';
    return (
        <Emoji className={cn(classes.main, `size-${size}`, `position-${position}`)}>{content}</Emoji>
    );
};
