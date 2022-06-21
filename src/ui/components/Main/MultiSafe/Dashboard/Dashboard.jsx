import { useStyles } from './Dashboard.styles';
import { PendingRequests } from './Transactions/PendingRequests';

export const Dashboard = () => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <PendingRequests />
        </div>
    );
};
