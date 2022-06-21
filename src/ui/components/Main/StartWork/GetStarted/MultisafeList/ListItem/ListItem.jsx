import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { useStyles } from './ListItem.styles';

export const ListItem = ({ multisafe: { multisafeId, name } }) => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Link to={`/multisafe/${multisafeId}/dashboard`}>
                <Button variant="outlined">{`${name} - ${multisafeId}`}</Button>
            </Link>
        </div>
    );
};
