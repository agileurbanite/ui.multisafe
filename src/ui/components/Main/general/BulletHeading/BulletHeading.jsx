import { ChevronRight } from '@material-ui/icons';

import { Headline } from '../../../general/Headline/Headline';
import { useStyles } from './BulletHeading.styles';

export const BulletHeading = ({ children }) => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <ChevronRight className={classes.chevron} />
            <Headline is={3}>{children}</Headline>
        </div>
    );
};
