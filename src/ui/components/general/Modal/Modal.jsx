import { Modal as MuiModal, Button } from '@material-ui/core';
import { useState } from 'react';

export const Modal = ({ children, isOpen, setOpen, button = {}, modal = {} }) => {
    const [_isOpen, _setOpen] = useState(false);

    const open = isOpen ?? _isOpen;
    const setter = setOpen ?? _setOpen;

    const onOpen = () => setter(true);
    const onClose = () => setter(false);

    return (
        <>
            <Button
                onClick={onOpen}
                className={button.className}
                variant={button.variant}
                color={button.color}>
                {button.content}
            </Button>
            <MuiModal className={modal.className} open={open} onClose={onClose}>
                {children}
            </MuiModal>
        </>
    );
};
