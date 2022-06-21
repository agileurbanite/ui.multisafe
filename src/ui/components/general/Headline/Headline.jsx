import cn from 'classnames';

import { useStyles } from './Headline.styles';

export const Headline = ({ textAlign, children, is, renderAs }) => {
    const classes = useStyles({ textAlign });
    const Hx = renderAs || `h${is}`;

    if (!is) return <Hx className={cn(classes.main, classes[textAlign])}>{children}</Hx>;

    return <Hx className={cn(classes.main, classes[`is${is}`], classes[textAlign])}>{children}</Hx>;
};
