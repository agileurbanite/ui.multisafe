import { useRef, useState } from 'react';
import { Popover as MuiPopover, Button } from '@material-ui/core';

export const Popover = ({ children, isOpen, setOpen, button = {}, popover = {} }) => {
  const [_isOpen, _setOpen] = useState(false);
  const buttonRef = useRef(null);

  const open = isOpen ?? _isOpen;
  const setter = setOpen ?? _setOpen;

  const onOpen = () => setter(true);
  const onClose = () => setter(false);

  return (
    <>
      <Button
        ref={buttonRef}
        onClick={onOpen}
        className={button.className}
        variant={button.variant}>
        {button.content}
      </Button>
      <MuiPopover
        anchorEl={buttonRef.current}
        className={popover.className}
        open={open}
        onClose={onClose}
        anchorOrigin={popover.anchorOrigin}
        transformOrigin={popover.transformOrigin}>
        {children}
      </MuiPopover>
    </>
  );
};
