//types
import AddStoreModalProps from '@interfaces/Stores/AddStoreModal';
//mui
import { Modal, Box } from '@mui/material';
//components
import AddStoreForm from '@components/Stores/AddStoreForm';

/**
 * Styles for the modal
 */
const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 'min(720px, 92vw)',
	maxHeight: '86vh',
	overflowY: 'auto',
	bgcolor: 'background.paper',
	border: '1px solid',
	borderColor: 'divider',
	borderRadius: 3,
	boxShadow: '0 22px 48px -20px rgba(18, 32, 51, 0.5)',
	p: { xs: 2.5, md: 3.5 },
};

/**
 * Renders the modal containing the AddStoreForm
 *
 * @param {AddStoreModalProps} props - The props
 * @returns {JSX.Element} - The AddStoreModal component
 */
const AddStoreModal = ({ open, closeModal, onAddStore, id }: AddStoreModalProps): JSX.Element => {
	return (
		<Modal open={open} onClose={closeModal}>
			<Box sx={style}>
				<AddStoreForm onAddStore={onAddStore} id={id} />
			</Box>
		</Modal>
	);
};

export default AddStoreModal;
