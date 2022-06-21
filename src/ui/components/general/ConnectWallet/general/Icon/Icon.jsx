import { IconButton } from '@material-ui/core';

import { useStyles } from './Icon.styles';

export const Icon = ({ onClick, title, icon }) => {
    const classes = useStyles();
    const Component = icon;
    return (
        <div className={classes.container}>
            <IconButton onClick={onClick}>
                <div className={classes.iconWrapper}>
                    <Component className={classes.icon} />
                </div>
            </IconButton>
            <span>{title}</span>
        </div>
    );
};
