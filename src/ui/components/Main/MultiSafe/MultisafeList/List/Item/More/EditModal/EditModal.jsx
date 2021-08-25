import { Button, Modal, Paper } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useStoreActions } from 'easy-peasy';
import { yupResolver } from '@hookform/resolvers/yup';
import { useStyles } from './EditModal.styles';
import { MultisafeName } from './MultisafeName/MultisafeName';
import { editSchema } from '../../../../../../../../../utils/validation/editSchema';

export const EditModal = ({
  isOpenEditModal,
  closeEditModal,
  stopPropagation,
  multisafeId,
  name,
}) => {
  const changeMultisafeName = useStoreActions((actions) => actions.multisafe.changeMultisafeName);
  const classes = useStyles();

  const { control, handleSubmit, formState: { errors }, } = useForm(
    {
    resolver: yupResolver(editSchema),
    mode: 'all',
  });

  const onSubmit = handleSubmit((data) => {
    changeMultisafeName({ multisafeId, data });
    closeEditModal();
  });

  return (
    <Modal
      onClick={stopPropagation}
      open={isOpenEditModal}
      onClose={closeEditModal}
      className={classes.modal}
    >
      <Paper className={classes.container}>
        <div className={classes.wrapper}>
          <h2 className={classes.header}>Edit Multisafe Name</h2>
          <form onSubmit={onSubmit}>
            <MultisafeName
              name={name}
              control={control}
              hasError={!!errors?.name}
              errorMessage={!!errors?.name && errors?.name?.message}
            />
            <div className={classes.footer}>
              <Button className={classes.cancel} onClick={closeEditModal}>
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </div>
          </form>
        </div>
      </Paper>
    </Modal>
  );
};
