import { TableCell } from '@material-ui/core';
// import { CallMade } from '@material-ui/icons';
import { useStyles } from './Type.styles';

export const Type = ({ type }) => {
  const classes = useStyles();
  return (
    <TableCell>
      <div className={classes.container}>
        {/* <CallMade className={classes.icon} /> */}
        {/* TODO: Create a list of known type and corresponding icon */}
        <span> {type} </span>
      </div>
    </TableCell>
  );
};
