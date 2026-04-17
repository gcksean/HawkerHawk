//types
import AddMenuItemModalProps from '@interfaces/Menu/AddMenuItemModal';
//lib
import { useState } from 'react';
//mui
import { Modal, Box, Button } from '@mui/material';
//components
import AddMenuItemForm from '@components/Menu/AddMenuItemForm';

/**
 * Styles for the modal
 */
const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 'min(560px, 92vw)',
	bgcolor: 'background.paper',
	border: '1px solid',
	borderColor: 'divider',
	borderRadius: 3,
	boxShadow: '0 22px 48px -20px rgba(18, 32, 51, 0.5)',
	p: 3,
};

/**
 * Renders the modal for the add menu item form
 *
 * @param {AddMenuItemModalProps} props - The onAddItem callback and store id
 * @returns {JSX.Element} - The modal that contains the add menu item form
 */
const AddMenuItemModal = ({ onAddItem, store_id }: AddMenuItemModalProps): JSX.Element => {
	const [open, setOpen] = useState<boolean>(false);

	const openModal = () => setOpen(true);
	const closeModal = () => setOpen(false);

	return (
		<>
			<Button size='small' onClick={openModal} variant='contained'>
				Add Menu Item
			</Button>
			<Modal open={open} onClose={closeModal}>
				<Box sx={style}>
					<AddMenuItemForm store_id={store_id} onAddItem={onAddItem} />
					<Button sx={{ mt: 1 }} fullWidth onClick={closeModal} variant='outlined' color='inherit'>
						Close
					</Button>
				</Box>
			</Modal>
		</>
	);
};

export default AddMenuItemModal;
