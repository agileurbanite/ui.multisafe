import { Item } from './Item/Item';
import { useStyles } from './List.styles';

export const List = ({ multisafes, title }) => {
  const classes = useStyles();

  if (multisafes.length === 0) return null;

  return (
    <div className={classes.container}>
      <h4 className={classes.title}>{title}</h4>
      <div>
        {multisafes.map((multisafe) => (
          <Item key={multisafe.multisafeId} multisafe={multisafe} />
        ))}
      </div>
    </div>
  );
};
