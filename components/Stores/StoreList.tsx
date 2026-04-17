//types
import StoreListProps from '@interfaces/Stores/StoreList';
import { Store } from '@interfaces/supabase';
//lib
import React from 'react';
//mui
import { Container, Grid, Typography, Box } from '@mui/material';
//components
import StoreCard from '@components/Stores/StoreCard';

/**
 * Renders a flex list of the stores in a centre
 *
 * @param {StoreListProps} props - The store and the filter
 * @returns {JSX.Element} - The store list component
 */
const StoreList = ({ stores, filter }: StoreListProps): JSX.Element => {
	const filteredStores = stores.filter((store: Store) => store.store_name.toLowerCase().includes(filter.toLowerCase()));

	return (
		<Container sx={{ marginTop: { xs: '2rem', md: '3rem' }, px: { xs: 0, sm: 2 } }}>
			<Box sx={{ mb: 2.5 }}>
				<Typography variant='h5'>Stores in this centre</Typography>
				<Typography sx={{ color: 'text.secondary', mt: 0.7 }}>Browse stall details, opening hours, and menu highlights.</Typography>
			</Box>
			<Grid container spacing={2.5}>
				{filteredStores.length ? (
					filteredStores.map((store: Store) => (
						<Grid item xs={12} md={6} lg={4} key={store.store_id}>
							<StoreCard store={store} />
						</Grid>
					))
				) : (
					<Box
						sx={{
							width: '100%',
							bgcolor: 'background.paper',
							borderRadius: 3,
							border: '1px solid',
							borderColor: 'divider',
							p: 3.5,
							textAlign: 'center',
						}}
					>
						<Typography variant='h6'>No stores found</Typography>
						<Typography sx={{ color: 'text.secondary', mt: 1 }}>Try adjusting your search or add a new store.</Typography>
					</Box>
				)}
			</Grid>
		</Container>
	);
};

export default StoreList;
