import { useStoreState } from 'easy-peasy';
import { ListItem } from './ListItem/ListItem';
import { useStyles } from './MultisafeList.styles';

export const MultisafeList = () => {
  const multisafes = useStoreState((store) => store.multisafe.multisafes);
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {multisafes.map((multisafe) => (
        <ListItem key={multisafe.multisafeId} multisafe={multisafe} />
      ))}
    </div>
  );
};
