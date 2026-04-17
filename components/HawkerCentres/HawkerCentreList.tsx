//types
import { HawkerAPIRecord } from '@interfaces/hawkerCentre';
import HawkerCentreListProps from '@interfaces/HawkerCentres/HawkerCentreList';
//lib
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
//mui
import { Container, Grid, Typography, Box } from '@mui/material';
//components
import HawkerCard from '@components/HawkerCentres/HawkerCard';
import HawkerCardSkeletons from '@components/HawkerCentres/HawkerCardSkeletons';
//context
import { HawkerCentresContext } from '@components/HawkerCentres/context/hawkerCentres';

/**
 * Renders the hawker cards into a flex list
 *
 * @param {HawkerCentreListProps} props - The filter if it exists
 * @returns {JSX.Element} - The hawker centre list component
 */
const HawkerCentreList = ({ filter }: HawkerCentreListProps): JSX.Element => {
	const { hawkerCentres, loading } = useContext(HawkerCentresContext);
	const filteredCentres = hawkerCentres.filter(
		(hawkerCentre) =>
			hawkerCentre.name.toLowerCase().includes(filter.toLowerCase()) ||
			hawkerCentre.address_myenv.toLowerCase().includes(filter.toLowerCase())
	);

	return (
		<Container sx={{ py: { xs: 4, md: 6 } }} maxWidth='xl'>
			<Box sx={{ mb: { xs: 3, md: 5 } }}>
				<Typography variant='h4'>Explore Hawker Centres</Typography>
				<Typography sx={{ mt: 1.2, color: 'text.secondary', maxWidth: '72ch' }}>
					Find iconic food spots, check operating status, and dive into stall details around Singapore.
				</Typography>
			</Box>
			{loading ? (
				<HawkerCardSkeletons />
			) : (
				<Grid container spacing={4}>
					{filteredCentres.length ? (
						filteredCentres.map((hawkerCentre) => (
							<Grid item key={hawkerCentre._id} xs={12} sm={6} md={4}>
								<HawkerCard hawkerCentre={hawkerCentre} />
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
								p: 4,
								textAlign: 'center',
							}}
						>
							<Typography variant='h6'>No hawker centres found</Typography>
							<Typography sx={{ color: 'text.secondary', mt: 1 }}>Try a different search term.</Typography>
						</Box>
					)}
				</Grid>
			)}
		</Container>
	);
};

export default HawkerCentreList;
