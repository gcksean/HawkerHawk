//types
import DetailedHawkerCardProps from '@interfaces/HawkerCentre/DetailedHawkerCard';
//helpers
import { isCentreOpen, getQuarter } from '@utils/dates';
//lib
import React from 'react';
//mui
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Link, Chip, Stack } from '@mui/material';

/**
 * Renders the detailed hawker card component
 *
 * @param {DetailedHawkerCardProps} props - The hawkerCentre and addStore callback
 * @returns {JSX.Element} - The detailed hawker card
 */
const DetailedHawkerCard = ({ hawkerCentre, addStore }: DetailedHawkerCardProps): JSX.Element => {
	if (!hawkerCentre) {
		return <div></div>;
	}

	const { open, remarks } = isCentreOpen(hawkerCentre, getQuarter());

	return (
		<>
			<Card raised sx={{ borderRadius: 3, overflow: 'hidden' }}>
				<CardMedia component='img' alt={hawkerCentre.name} height='260' image={hawkerCentre.photourl} />
				<CardContent>
					<Typography gutterBottom variant='h4' component='div'>
						{hawkerCentre.name}
					</Typography>
					<Typography variant='body1' color='text.secondary' sx={{ mb: 2 }}>
						{hawkerCentre.description_myenv}
					</Typography>
					<Stack direction='row' spacing={1} sx={{ mb: 1.5, flexWrap: 'wrap', rowGap: 1 }}>
						<Chip label={`Food stalls: ${hawkerCentre.no_of_food_stalls}`} />
						<Chip label={`Market stalls: ${hawkerCentre.no_of_market_stalls}`} />
						<Chip color={open ? 'success' : 'error'} label={open ? 'Open now' : 'Currently closed'} />
					</Stack>
					<Typography sx={{ mb: 1 }}>Street address: {hawkerCentre.address_myenv}</Typography>
					{remarks && <Typography>{remarks}</Typography>}
				</CardContent>
				<CardActions sx={{ px: 2, pb: 2, gap: 1.2 }}>
					<Button size='small' variant='outlined' color='primary'>
						<Link
							underline='none'
							target='_blank'
							href={`http://www.google.com/maps/place/${hawkerCentre.latitude_hc},${hawkerCentre.longitude_hc}`}
						>
							View on maps
						</Link>
					</Button>

					<Button onClick={addStore} size='small' variant='contained' color='secondary'>
						Add store
					</Button>
				</CardActions>
			</Card>
		</>
	);
};

export default DetailedHawkerCard;
