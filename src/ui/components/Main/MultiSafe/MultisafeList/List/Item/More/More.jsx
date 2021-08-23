import { useRef, useState } from 'react';
import { IconButton, Popover } from '@material-ui/core';
import { MoreVertOutlined, EditOutlined, DeleteOutline } from '@material-ui/icons';
import { MenuItem } from './MenuItem/MenuItem';
import { useStyles } from './More.styles';
import { RemoveModal } from './RemoveModal/RemoveModal';

export const More = ({ name, multisafeId }) => {
  const [isOpen, setOpen] = useState(false);
  const [isOpenRemoveModal, setOpenRemoveModal] = useState(false);
  const buttonRef = useRef(null);

  const onOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const onClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  const exportCampaignCSV = () => {};
  const stopPropagation = (e) => e.stopPropagation();

  const openRemoveModal = () => {
    setOpenRemoveModal(true);
    setOpen(false);
  };

  const closeRemoveModal = () => {
    setOpenRemoveModal(false);
  };

  const classes = useStyles();
  return (
    <>
      <IconButton ref={buttonRef} className={classes.button} onClick={onOpen}>
        <MoreVertOutlined />
      </IconButton>
      <Popover
        anchorEl={buttonRef.current}
        classes={{ paper: classes.popover }}
        open={isOpen}
        onClose={onClose}
        transitionDuration={{ appear: 0, enter: 0, exit: 0 }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div
          onClick={stopPropagation}
          onKeyPress={stopPropagation}
          role="button"
          tabIndex={0}
          className={classes.container}
        >
          <MenuItem
            icon={EditOutlined}
            classNames={{ icon: classes.exportCsv }}
            text="Edit"
            onClick={exportCampaignCSV}
          />
          <MenuItem
            icon={DeleteOutline}
            classNames={{ icon: classes.deleteCampaign }}
            text="Remove"
            onClick={openRemoveModal}
          />
        </div>
      </Popover>
      {isOpenRemoveModal && (
        <RemoveModal
          isOpenRemoveModal={isOpenRemoveModal}
          closeRemoveModal={closeRemoveModal}
          stopPropagation={stopPropagation}
          multisafeId={multisafeId}
          name={name}
        />
      )}
    </>
  );
};
