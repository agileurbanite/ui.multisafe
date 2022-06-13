import { useRouteMatch } from 'react-router';
import { Item } from './Item/Item';
import { SubItem } from './Item/SubItem';
import { getItems } from './getItems';
import { useStyles } from './Navigation.styles';

export const Navigation = () => {
  const match = useRouteMatch();
  const classes = useStyles();
  const items = getItems(match);
  
  return (
    <div className={classes.container}>
      {items.map((item) => (
        <div key={item.path}>
          <Item item={item} />
          {item.subItems?.map((subItem) => (
            <SubItem key={`sub-${subItem.path}`} item={subItem} />
          ))}
        </div>
      ))}
    </div>
  );
};
