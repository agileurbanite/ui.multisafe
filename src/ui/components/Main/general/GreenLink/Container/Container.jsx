import { Tooltip } from '@material-ui/core';
import { Link } from 'react-router-dom';

export const Container = ({ children, to, disabled }) =>
    disabled ? (
        <Tooltip placement="top" title="Please connect your wallet to use this functionality">
            <div>{children}</div>
        </Tooltip>
    ) : (
        <Link to={to}>{children}</Link>
    );
