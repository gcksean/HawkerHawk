//types
import StoreCardProps from '@interfaces/Stores/StoreCard';
//lib
import { useState } from 'react';
//mui
import { Card, CardContent, Typography, Button, Chip, Stack } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
//components
import MenuModal from '@components/Menu/MenuModal';

/**
 * Renders a card for a store
 *
 * @param {StoreCardProps} props - The store
 * @returns {JSX.Element} - The Store Card component
 */
const StoreCard = ({ store }: StoreCardProps): JSX.Element => {
	const [open, setOpen] = useState<boolean>(false);

	/**Opens the modal */
	const openModal = () => setOpen(true);

	/**Closes the modal */
	const closeModal = () => setOpen(false);

	const { weekdays, weekends_ph, closed } = store.store_hours[0];
	return (
		<Card sx={{ height: '100%', borderRadius: 3 }}>
			<CardContent>
				<Typography variant='h6' sx={{ mb: 1 }}>
					{store.store_name}
				</Typography>
				<Chip size='small' label={`Unit ${store.store_unit}`} sx={{ mb: 1.5 }} />
				<Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{store.store_info}</Typography>
				<Stack spacing={0.4} sx={{ mb: 2.2 }}>
					<Typography variant='body2'>Weekdays: {weekdays}</Typography>
					<Typography variant='body2'>Weekends/PH: {weekends_ph}</Typography>
					<Typography variant='body2'>Closed on: {closed}</Typography>
				</Stack>
				<Button onClick={openModal} variant='contained' size='small' fullWidth startIcon={<MenuBookIcon />}>
					View menu
				</Button>
				<MenuModal store={store} open={open} closeModal={closeModal} />
			</CardContent>
		</Card>
	);
};

export default StoreCard;
