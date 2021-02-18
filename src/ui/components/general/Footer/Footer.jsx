import { useStyles } from './Footer.styles';

export const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <p className={classes.text}>
        ©2020 Multi Safe | Terms | Privacy | Licenses | Imprint | Cookie Policy - Preferences |
        v2.17.0
      </p>
    </div>
  );
};
