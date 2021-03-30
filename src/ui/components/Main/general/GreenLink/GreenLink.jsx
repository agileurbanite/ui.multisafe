import { Container } from './Container/Container';
import { useStyles } from './GreenLink.styles';

export const GreenLink = ({ to, text, icon, disabled }) => {
  const classes = useStyles({ disabled });
  const Icon = icon;

  return (
    <Container to={to} disabled={disabled}>
      <div className={classes.container}>
        <div className={classes.iconContainer}>
          <Icon className={classes.icon} />
        </div>
        <div className={classes.textContainer}>
          <span className={classes.text}>{text}</span>
        </div>
      </div>
    </Container>
  );
};
