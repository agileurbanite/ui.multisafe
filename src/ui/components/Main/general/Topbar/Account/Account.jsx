import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';
import { Near } from '@ui/components/general/icons/Near';
import { Popover } from '@ui/components/general/Popover/Popover';
import { useState } from 'react';

import { useStyles } from './Account.styles';
import { Modal } from './Modal/Modal';

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
