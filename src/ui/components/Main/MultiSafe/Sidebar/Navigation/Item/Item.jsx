import { Link } from 'react-router-dom';

import { useStyles } from './Item.styles';

export const Item = ({ item: { name, icon, path, isActive } }) => {
    const classes = useStyles({ isActive });
    const Icon = icon;

    return (
        <Link to={path}>
            <div className={classes.container}>
                <Icon className={classes.icon} />
                <span className={classes.name}>{name}</span>
            </div>
        </Link>
    );
};
