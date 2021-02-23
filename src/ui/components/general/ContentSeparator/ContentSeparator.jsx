import cn from 'classnames';
import { useStyles } from './ContentSeparator.styles';

const ContentSeparator = ({ bg, height }) => {
  const classes = useStyles({ bg, height });
  return <hr className={cn(classes.main, `height-${height}`)} />;
};

export { ContentSeparator };
