import { Item } from './Item/Item';
import { useStyles } from './List.styles';

export const List = ({ multisafes }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {multisafes.map((multisafe) => (
        <Item key={multisafe.multisafeId} multisafe={multisafe} />
      ))}
    </div>
  );
};
