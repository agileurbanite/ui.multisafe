import { useStyles } from './History.styles';
import { Requests } from './Transactions/Requests';

export const History = () => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Requests />
        </div>
    );
};
