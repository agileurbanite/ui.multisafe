import { Link } from 'react-router-dom';

import { useStyles } from './Item.styles';

export const SubItem = ({ item: { name, path, isActive } }) => {
    const classes = useStyles({ isActive });

    return (
        <Link to={path}>
            <div className={classes.subContainer}>
                <span className={classes.name}>{name}</span>
            </div>
        </Link>
    );
};
