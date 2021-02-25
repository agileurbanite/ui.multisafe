import { useStyles } from './FormItemHeader.styles';
import { Headline } from '../../../general/Headline/Headline';

const renderHeader = (headline, className, extra = null) => {
  const { header, subheader } = className;
  return (
    <>
      {extra ? (
        <>
          <div className={subheader}>{extra}</div>
          <Headline is={3} renderAs="h3" className={header}>
            {headline}
          </Headline>
        </>
      ) : (
        <Headline is={3} renderAs="h3" className={header}>
          {headline}
        </Headline>
      )}
    </>
  );
};

export const FormItemHeader = ({ headline, subheader /* TODO: String | String[] */ }) => {
  const classes = useStyles();

  return (
    <>
      {renderHeader(headline, classes)}
      <span>{subheader}</span>
    </>
  );
};
