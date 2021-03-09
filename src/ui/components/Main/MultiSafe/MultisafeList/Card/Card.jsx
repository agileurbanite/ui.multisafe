import { Paper, Divider, IconButton } from '@material-ui/core';
import { Add, SystemUpdateAlt, Close } from '@material-ui/icons';
import { useStoreState } from 'easy-peasy';
import { routes } from '../../../../../config/routes';
import { GreenLink } from '../../../general/GreenLink/GreenLink';
import { List } from './List/List';
import { useStyles } from './Card.styles';

export const Card = ({ onListClose }) => {
  const membership = useStoreState((store) => store.multisafe.selectors.multisafes.membership);
  const readOnly = useStoreState((store) => store.multisafe.selectors.multisafes.readOnly);
  const classes = useStyles();

  return (
    <Paper className={classes.container} elevation={5} square>
      <div className={classes.topbar}>
        <div className={classes.arrow} />
        <IconButton onClick={onListClose}>
          <Close className={classes.topbarIcon} />
        </IconButton>
        <h3 className={classes.header}>Multi Safe List</h3>
      </div>
      <Divider className={classes.divider} />
      <GreenLink to={routes.createMultisafe} text="Create new Multi Safe" icon={Add} />
      <GreenLink to={routes.loadMultisafe} text="Load existing Multi Safe" icon={SystemUpdateAlt} />
      <List multisafes={membership} />
      <h4 className={classes.readOnlyHeader}>Read Only</h4>
      <List multisafes={readOnly} />
    </Paper>
  );
};
