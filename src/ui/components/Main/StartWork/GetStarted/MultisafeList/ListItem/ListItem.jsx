import { Button } from '@material-ui/core';
import { useStyles } from './ListItem.styles';

export const ListItem = ({ multisafe: { multisafeId, name }, onLoadMultisafePanel, push }) => {
  const classes = useStyles();

  const onClick = () => {
    onLoadMultisafePanel({ push, multisafeId });
  };

  return (
    <div className={classes.container}>
      <Button variant="outlined" onClick={onClick}>{`${name} - ${multisafeId}`}</Button>
    </div>
  );
};
