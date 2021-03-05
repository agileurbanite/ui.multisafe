import { Item } from './Item/Item';
import { useStyles } from './List.styles';

export const List = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Item name="My Safe" />
    </div>
  );
};
