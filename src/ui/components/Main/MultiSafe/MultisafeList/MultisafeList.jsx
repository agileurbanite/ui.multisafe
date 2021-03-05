import { Card } from './Card/Card';
import { useStyles } from './MultisafeList.styles';

export const MultisafeList = ({ onListClose, isListOpen }) => {
  const classes = useStyles({ isListOpen });
  return (
    <div className={classes.container}>
      <Card onListClose={onListClose} />
      <div onClick={onListClose} className={classes.closeArea} aria-hidden />
    </div>
  );
};
