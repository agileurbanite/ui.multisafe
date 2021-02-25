import { useStoreState, useStoreActions } from 'easy-peasy';
import { useHistory } from 'react-router-dom';
import { ListItem } from './ListItem/ListItem';
import { useStyles } from './MultisafeList.styles';

export const MultisafeList = () => {
  const multisafes = useStoreState((s) => s.startWork.multisafes);
  const onLoadMultisafePanel = useStoreActions((a) => a.multisafe.onLoadMultisafePanel);
  const { push } = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {multisafes.map((multisafe) => (
        <ListItem
          key={multisafe.multisafeId}
          multisafe={multisafe}
          onLoadMultisafePanel={onLoadMultisafePanel}
          push={push}
        />
      ))}
    </div>
  );
};
