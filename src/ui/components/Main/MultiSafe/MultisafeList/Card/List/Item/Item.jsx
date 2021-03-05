import { useStyles } from './Item.styles';

export const Item = ({ emoji, name }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.iconContainer}>
        <span className={classes.icon}>{emoji}</span>
      </div>
      <div className={classes.textContainer}>
        <span className={classes.text}>{name}</span>
      </div>
    </div>
  );
};
