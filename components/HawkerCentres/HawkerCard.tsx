//type
import HawkerCardProps from '@interfaces/HawkerCentres/HawkerCard';
//helpers
import { isCentreOpen, getQuarter } from '@utils/dates';
//lib
import Link from 'next/link';
//mui
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Chip, Stack, Box } from '@mui/material';

/**
 * Renders a Card with basic information about the Hawker centre.
 *
 * @param {HawkerCardProps} props - The hawker centre to render in the card
 * @returns {JSX.Element} - The Hawker Card component
 */
const HawkerCard = ({ hawkerCentre }: HawkerCardProps): JSX.Element => {
	const { open, remarks } = isCentreOpen(hawkerCentre, getQuarter());

	return (
		<Card
			raised
			sx={{
				height: '100%',
				flex: '1',
				display: 'flex',
				flexDirection: 'column',
				borderRadius: 3,
				overflow: 'hidden',
			}}
		>
			<CardMedia component='img' image={hawkerCentre.photourl} alt={hawkerCentre.name} sx={{ height: 180 }} />
			<CardContent sx={{ flexGrow: 1 }}>
				<Typography variant='h5' component='h2' sx={{ mb: 1 }}>
					{hawkerCentre.name}
				</Typography>
				<Stack direction='row' spacing={1} sx={{ mb: 1.5, flexWrap: 'wrap', rowGap: 1 }}>
					<Chip size='small' label={`Food: ${hawkerCentre.no_of_food_stalls}`} />
					<Chip size='small' label={`Market: ${hawkerCentre.no_of_market_stalls}`} />
				</Stack>
				<Typography sx={{ color: 'text.secondary' }}>{hawkerCentre.address_myenv}</Typography>
			</CardContent>
			<CardContent sx={{ pt: 0 }}>
				<Box sx={{ display: 'inline-flex', px: 1.2, py: 0.5, borderRadius: 6, bgcolor: open ? '#e8f5e9' : '#ffebee' }}>
					<Typography variant='body2' sx={{ color: open ? '#1b5e20' : '#b71c1c', fontWeight: 700 }}>
						{open ? 'Open now' : 'Currently closed'}
					</Typography>
				</Box>
				{remarks && <Typography>{remarks}</Typography>}
			</CardContent>
			<CardActions sx={{ p: 2, pt: 0 }}>
				<Button size='small' variant='contained' fullWidth>
					<Link href={`/hawker_centre/${hawkerCentre._id}`}>
						<a
							style={{
								textDecoration: 'none',
								color: 'inherit',
							}}
						>
							View details
						</a>
					</Link>
				</Button>
			</CardActions>
		</Card>
	);
};

export default HawkerCard;
