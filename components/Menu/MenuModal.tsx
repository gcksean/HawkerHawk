//types
import { StoreMenus } from '@interfaces/supabase';
import MenuModalProps from '@interfaces/Menu/MenuModal';
//lib
import { useState } from 'react';
//mui
import { Modal, Box, Typography } from '@mui/material';
//components
import AddMenuItemModal from '@components/Menu/AddMenuItemModal';
import MenuTable from '@components/Menu/MenuTable';

/**
 * Style for the modal
 */
const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 'min(860px, 94vw)',
	maxHeight: '88vh',
	overflowY: 'auto',
	bgcolor: 'background.paper',
	border: '1px solid',
	borderColor: 'divider',
	borderRadius: 3,
	boxShadow: '0 22px 48px -20px rgba(18, 32, 51, 0.5)',
	p: { xs: 2.5, md: 3.5 },
};

/**
 * Renders the modal containing the menu table
 *
 * @param {MenuModalProps} props - The open state, closeModal callback and the store
 * @returns {JSX.Element} - The modal containing the menu table
 */
const MenuModal = ({ open, closeModal, store }: MenuModalProps): JSX.Element => {
	const [menu, setMenu] = useState<StoreMenus[]>(store.store_menus);

	/**
	 * Adds a menu item to the state
	 *
	 * @param {StoreMenus} menuItem - The menu item added
	 */
	const onAddItem = (menuItem: StoreMenus) => {
		setMenu([...menu, menuItem]);
	};

	return (
		<Modal open={open} onClose={closeModal}>
			<Box sx={style}>
				<Typography variant='h5' id='modal-modal-title' sx={{ mb: 0.5 }}>
					{store.store_name}
				</Typography>
				<Typography sx={{ color: 'text.secondary', mb: 2 }}>{store.store_info}</Typography>
				<Typography variant='h6' id='modal-modal-title' sx={{ mb: 1.2 }}>
					Menu
				</Typography>
				<AddMenuItemModal store_id={store.store_id} onAddItem={onAddItem} />
				<MenuTable menu={menu} />
			</Box>
		</Modal>
	);
};

export default MenuModal;
