import { useState } from 'react';
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';
import { Near } from '../../../../general/icons/Near';
import { Popover } from '../../../../general/Popover/Popover';
import { Modal } from './Modal/Modal';
import { useStyles } from './Account.styles';

export const Account = ({ accountId }) => {
  const [isOpen, setOpen] = useState(false);
  const classes = useStyles({ isOpen });
  return (
    <Popover
      isOpen={isOpen}
      setOpen={setOpen}
      button={{
        content: (
          <div className={classes.buttonContent}>
            <Near className={classes.nearIcon} />
            <span className={classes.accountId}>{accountId}</span>
            {isOpen ? <ArrowDropUp /> : <ArrowDropDown />}
          </div>
        ),
        className: classes.button,
        variant: 'outlined',
      }}
      popover={{
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      }}>
      <Modal accountId={accountId} />
    </Popover>
  );
};
