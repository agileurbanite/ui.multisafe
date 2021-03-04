import { useRouteMatch } from 'react-router';
import { Item } from './Item/Item';
import { getItems } from './getItems';
import { useStyles } from './Navigation.styles';

export const Navigation = () => {
  const match = useRouteMatch();
  const classes = useStyles();

  const items = getItems(match);
  return (
    <div className={classes.container}>
      {items.map((item) => (
        <Item key={item.path} item={item} />
      ))}
    </div>
  );
};
